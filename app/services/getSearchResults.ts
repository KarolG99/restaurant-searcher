import { LocationV2 } from "@/database.types";
import supabase from "./supabase";
import { getSearchRange } from "../utils/getSearchRange";

export const getSearchResults = async (
  locationParam: string,
  cuisineParam: string,
  dietParam: string,
  priceParam: string,
  mealParam: string,
  pageParam: string,
  locations: LocationV2[]
) => {
  const locationFilter =
    locationParam.length > 0 ? Number(locationParam) : null;
  const cuisineFilter =
    cuisineParam.length > 0 ? cuisineParam.split(",").map(Number) : [];
  const dietFilter =
    dietParam.length > 0 ? dietParam.split(",").map(Number) : [];
  const priceFilter =
    priceParam.length > 0 ? priceParam.split(",").map(Number) : [];
  const mealFilter =
    mealParam.length > 0 ? mealParam.split(",").map(Number) : [];

  const searchedLocation = locations.find((el) => el.id === locationFilter);

  const { from, to } = getSearchRange(Number(pageParam));

  if (locationFilter && searchedLocation) {
    const {
      data: restaurants,
      error,
      count,
    } = await supabase
      .rpc(
        "nearby_restaurants",
        {
          lat: searchedLocation.lat,
          long: searchedLocation.long,
          cuisines: cuisineFilter.length > 0 ? cuisineFilter : null,
          diets: dietFilter.length > 0 ? dietFilter : null,
          prices: priceFilter.length > 0 ? priceFilter : null,
          meals: mealFilter.length > 0 ? mealFilter : null,
          locationparam: locationFilter,
        },
        { count: "exact" }
      )
      .range(from, to);
    return { restaurants, error, count };
  } else {
    let query = supabase.from("restaurants").select("*");
    let restaurantsCount = supabase
      .from("restaurants")
      .select("*", { count: "exact", head: true });

    if (cuisineFilter.length > 0) {
      query = query.overlaps("cuisine", cuisineFilter);
      restaurantsCount = restaurantsCount.overlaps("cuisine", cuisineFilter);
    }
    if (dietFilter.length > 0) {
      query = query.overlaps("diet", dietFilter);
      restaurantsCount = restaurantsCount.overlaps("diet", dietFilter);
    }
    if (priceFilter.length > 0) {
      query = query.overlaps("averagePrice", priceFilter);
      restaurantsCount = restaurantsCount.overlaps("averagePrice", priceFilter);
    }
    if (mealFilter.length > 0) {
      query = query.overlaps("meal", mealFilter);
      restaurantsCount = restaurantsCount.overlaps("meal", mealFilter);
    }

    const { count } = await restaurantsCount;
    const { data: restaurants, error } = await query.range(from, to);

    return { restaurants, error, count };
  }
};
