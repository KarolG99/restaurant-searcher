import { revalidateTime } from "@/app/config/base";
import { getSearchResults } from "@/app/services/getSearchResults";
import supabase from "@/app/services/supabase";
import { ParamsType } from "@/app/types";
import BackButton from "@/app/ui/BackButton";
import Filters from "@/app/ui/Filters";
import RestaurantCard from "@/app/ui/RestaurantCard";
import SearchFilters from "@/app/ui/SearchFilters";
import { Restaurant } from "@/database.types";

export const revalidate = revalidateTime;

type SearchProps = {
  searchParams?: {
    location?: string;
    cuisine?: string;
    diet?: string;
    price?: string;
    meal?: string;
  };
} & ParamsType;

export default async function Search({
  params: { locale },
  searchParams,
}: SearchProps) {
  const locationParam = searchParams?.location || "";
  const cuisineParam = searchParams?.cuisine || "";
  const dietParam = searchParams?.diet || "";
  const priceParam = searchParams?.price || "";
  const mealParam = searchParams?.meal || "";

  const [
    locationsResponse,
    cuisinesResponse,
    dietsResponse,
    pricesResponse,
    mealsResponse,
  ] = await Promise.all([
    supabase.rpc("get_location_data"),
    supabase.from("cuisines").select("*"),
    supabase.from("diets").select("*"),
    supabase.from("prices").select("*"),
    supabase.from("meals").select("*"),
  ]);
  const locations = locationsResponse.data ?? [];
  const cuisines = cuisinesResponse.data ?? [];
  const diets = dietsResponse.data ?? [];
  const prices = pricesResponse.data ?? [];
  const meals = mealsResponse.data ?? [];

  const { restaurants, error } = await getSearchResults(
    locationParam,
    cuisineParam,
    dietParam,
    priceParam,
    mealParam,
    locations,
    cuisines,
    diets,
    prices,
    meals
  );

  return (
    <article>
      <BackButton href={`/${locale}`} text="Back to home" />

      <SearchFilters
        locations={locations}
        cuisines={cuisines}
        diets={diets}
        prices={prices}
        meals={meals}
      />

      <section className="mt-[20px]">
        <h2 className="text-l font-bold">Search results</h2>

        <div className="flex flex-wrap gap-[10px]">
          {restaurants.map((restaurant: Restaurant, index: number) => (
            <div
              key={`${restaurant.id}_${index}`}
              className="restaurantWrapper"
            >
              <RestaurantCard
                restaurant={restaurant}
                cuisines={cuisines}
                diets={diets}
                prices={prices}
                locale={locale}
              />
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
