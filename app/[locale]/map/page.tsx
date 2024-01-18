import supabase from "@/app/services/supabase";
import { ParamsType, SearchParamsType } from "@/app/types";
import MapSearchView from "@/app/ui/MapSearchView";
import { LocationV2 } from "@/database.types";

type MapPageProps = {
  searchParams?: SearchParamsType;
} & ParamsType;

export default async function MapPage({
  params: { locale },
  searchParams,
}: MapPageProps) {
  const locationParam = searchParams?.location ?? "";
  const cuisineParam = searchParams?.cuisine ?? "";
  const dietParam = searchParams?.diet ?? "";
  const priceParam = searchParams?.price ?? "";
  const mealParam = searchParams?.meal ?? "";

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

  const selectedLocation =
    locationParam &&
    locations.find(
      (location: LocationV2) => Number(locationParam) === location.id
    );

  return (
    <MapSearchView
      cuisineParam={cuisineParam}
      dietParam={dietParam}
      priceParam={priceParam}
      mealParam={mealParam}
      locale={locale}
      prices={prices}
      selectedLocation={selectedLocation}
    />
  );
}
