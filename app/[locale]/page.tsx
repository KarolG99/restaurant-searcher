import { getDictionary } from "../dictionaries/getDictionary";
import supabase from "../services/supabase";
import { ParamsType } from "../types";
import CuisineFilters from "../ui/CuisineFilters";
import LocationFilters from "../ui/LocationFilters";

export default async function Home({ params: { locale } }: ParamsType) {
  const dictionary = getDictionary(locale);

  const { data: locations } = await supabase.from("locations").select("*");

  const { data: cuisines } = await supabase.from("cuisines").select("*");

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
      </article>
    </>
  );
}
