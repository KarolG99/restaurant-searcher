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

  const { data: locations } = await supabase.from("locations").select("*");

  const { data: cuisines } = await supabase.from("cuisines").select("*");

  const { data: diets } = await supabase.from("diets").select("*");

  const { data: prices } = await supabase.from("prices").select("*");

  const { data: meals } = await supabase.from("meals").select("*");

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
