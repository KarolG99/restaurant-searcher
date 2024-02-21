import { Metadata } from "next";

import {
  metadataImageUrl,
  metadataSiteName,
  metadataUrl,
  resultsPerPage,
  revalidateTime,
} from "@/app/config/base";
import { Routes } from "@/app/config/routes";
import { getDictionary } from "@/app/dictionaries/getDictionary";
import { getSearchResults } from "@/app/services/getSearchResults";
import supabase from "@/app/services/supabase";
import { ParamsType, SearchParamsType } from "@/app/types";
import BackButton from "@/app/ui/BackButton";
import RestaurantCard from "@/app/ui/RestaurantCard";
import SearchFilters from "@/app/ui/SearchFilters";
import { Restaurant } from "@/database.types";
import PaginationComponent from "@/app/ui/Pagination";
import OpenMapButton from "@/app/ui/OpenMapButton";

export const revalidate = revalidateTime;

export async function generateMetadata({
  params: { locale },
}: ParamsType): Promise<Metadata> {
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.common.metadata.search.title,
    description: dictionary.common.metadata.search.description,
    openGraph: {
      title: dictionary.common.metadata.search.title,
      siteName: metadataSiteName,
      url: `${metadataUrl}${Routes.SEARCH}`,
      description: dictionary.common.metadata.search.description,
      type: "website",
      images: [
        {
          url: metadataImageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title: dictionary.common.metadata.search.title,
      images: [
        {
          url: metadataImageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

type SearchProps = {
  searchParams?: SearchParamsType;
} & ParamsType;

export default async function Search({
  params: { locale },
  searchParams,
}: SearchProps) {
  const locationParam = searchParams?.location ?? "";
  const cuisineParam = searchParams?.cuisine ?? "";
  const dietParam = searchParams?.diet ?? "";
  const priceParam = searchParams?.price ?? "";
  const mealParam = searchParams?.meal ?? "";
  const pageParam = searchParams?.page ?? "1";

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

  const { restaurants, count } = await getSearchResults(
    locationParam,
    cuisineParam,
    dietParam,
    priceParam,
    mealParam,
    pageParam,
    locations
  );

  const resultsCount = count ?? 0;
  const totalPages = Math.ceil(resultsCount / resultsPerPage);

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
        <h2 className="text-l font-bold">Search results ({resultsCount})</h2>

        <div className="flex flex-wrap gap-[10px]">
          {resultsCount === 0 && restaurants.length === 0 ? (
            <p className="mt-[20px]">No results found for your search criteria 🫣</p>
          ) : null}

          {restaurants?.map((restaurant: Restaurant, index: number) => (
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

        <PaginationComponent totalPages={totalPages} />
      </section>

      <OpenMapButton locale={locale} />
    </article>
  );
}
