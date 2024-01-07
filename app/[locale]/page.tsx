import { getDictionary } from "../dictionaries/getDictionary";
import supabase from "../services/supabase";
import { ParamsType } from "../types";
import CuisineFilters from "../ui/CuisineFilters";
import DietFilters from "../ui/DietFilters";
import LocationFilters from "../ui/LocationFilters";
import MealFilters from "../ui/MealFilters";
import PriceFilters from "../ui/PriceFilters";

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

  return (
    <>
      <h1 className=" font-black text-xl text-center pb-[30px]">
        {dictionary.pages.home.title.text1}
        <br />
        {dictionary.pages.home.title.text2}
      </h1>

      <article className="flex flex-col gap-[15px]">
        <LocationFilters locations={locations} />
        <CuisineFilters cuisines={cuisines} />
        <DietFilters diets={diets} />
        <PriceFilters prices={prices} />
        <MealFilters meals={meals} />
      </article>
    </>
  );
}
