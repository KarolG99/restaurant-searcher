import { Cuisine, Diet, LocationV2, Meal, Price } from "@/database.types";
import supabase from "./supabase";

export const getSearchResults = async (
  locationParam: string,
  cuisineParam: string,
  dietParam: string,
  priceParam: string,
  mealParam: string,
  locations: LocationV2[],
  cuisines: Cuisine[],
  diets: Diet[],
  prices: Price[],
  meals: Meal[]
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

  if (locationFilter && searchedLocation) {
    const { data: restaurants, error } = await supabase.rpc(
      "nearby_restaurants",
      {
        lat: searchedLocation.lat,
        long: searchedLocation.long,
        cuisines: cuisineFilter.length > 0 ? cuisineFilter : null,
        diets: dietFilter.length > 0 ? dietFilter : null,
        prices: priceFilter.length > 0 ? priceFilter : null,
        meals: mealFilter.length > 0 ? mealFilter : null,
        locationparam: locationFilter,
      }
    );
    return { restaurants, error };
  } else {
    let query = supabase.from("restaurants").select("*");

    if (cuisineFilter.length > 0) {
      query = query.overlaps("cuisine", cuisineFilter);
    }
    if (dietFilter.length > 0) {
      query = query.overlaps("diet", dietFilter);
    }
    if (priceFilter.length > 0) {
      query = query.overlaps("averagePrice", priceFilter);
    }
    if (mealFilter.length > 0) {
      query = query.overlaps("meal", mealFilter);
    }

    const { data: restaurants, error } = await query;

    return { restaurants, error };
  }
};
