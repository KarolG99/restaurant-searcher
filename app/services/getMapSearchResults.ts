import { Cuisine, Diet, Meal, Price } from "@/database.types";
import supabase from "./supabase";

export const getMapSearchResults = async (
  min_lat: number,
  min_long: number,
  max_lat: number,
  max_long: number,
  cuisineParam: string,
  dietParam: string,
  priceParam: string,
  mealParam: string
) => {
  const cuisineFilter =
    cuisineParam.length > 0 ? cuisineParam.split(",").map(Number) : [];
  const dietFilter =
    dietParam.length > 0 ? dietParam.split(",").map(Number) : [];
  const priceFilter =
    priceParam.length > 0 ? priceParam.split(",").map(Number) : [];
  const mealFilter =
    mealParam.length > 0 ? mealParam.split(",").map(Number) : [];

  const { data, error } = await supabase
    .rpc("restaurants_in_view", {
      min_lat,
      min_long,
      max_lat,
      max_long,
      cuisines: cuisineFilter.length > 0 ? cuisineFilter : null,
      diets: dietFilter.length > 0 ? dietFilter : null,
      prices: priceFilter.length > 0 ? priceFilter : null,
      meals: mealFilter.length > 0 ? mealFilter : null,
    })
    .range(0, 100);

  return { data, error };
};
