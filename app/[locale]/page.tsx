import { getDictionary } from "../dictionaries/getDictionary";

import HomeFilters from "../ui/HomeFilters";

import supabase from "../services/supabase";

import { ParamsType } from "../types";
import RestaurantsCarousel from "../ui/RestaurantsCarousel";

export const revalidate = 21600;

export default async function Home({ params: { locale } }: ParamsType) {
  const dictionary = getDictionary(locale);

  const [
    locationsResponse,
    cuisinesResponse,
    dietsResponse,
    pricesResponse,
    mealsResponse,
  ] = await Promise.all([
    supabase.from("locations").select("*"),
    supabase.from("cuisines").select("*"),
    supabase.from("diets").select("*"),
    supabase.from("prices").select("*"),
    supabase.from("meals").select("*"),
  ]);
  const locations = locationsResponse.data || [];
  const cuisines = cuisinesResponse.data || [];
  const diets = dietsResponse.data || [];
  const prices = pricesResponse.data || [];
  const meals = mealsResponse.data || [];

  const { data: restaurantsLocationId1 } = await supabase
    .from("restaurants")
    .select("*")
    .eq("locationId", 1)
    .range(0, 5);
  const { data: restaurantsLocationId2 } = await supabase
    .from("restaurants")
    .select("*")
    .eq("locationId", 2)
    .range(0, 5);

  return (
    <>
      <h1 className=" font-black text-xl text-center pb-[30px]">
        {dictionary.pages.home.title.text1}
        <br />
        {dictionary.pages.home.title.text2}
      </h1>

      <HomeFilters
        locations={locations}
        cuisines={cuisines}
        diets={diets}
        prices={prices}
        meals={meals}
      />

      <RestaurantsCarousel
        restaurants={restaurantsLocationId1}
        location={locations.filter((location) => location.id === 1)?.[0]}
        prices={prices}
        cuisines={cuisines}
        diets={diets}
      />

      <RestaurantsCarousel
        restaurants={restaurantsLocationId2}
        location={locations.filter((location) => location.id === 2)?.[0]}
        prices={prices}
        cuisines={cuisines}
        diets={diets}
      />
    </>
  );
}
