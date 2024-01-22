"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import CuisineFilters from "./CuisineFilters";
import DietFilters from "./DietFilters";
import LocationFilters from "./LocationFilters";
import MealFilters from "./MealFilters";
import PriceFilters from "./PriceFilters";
import SubmitButton from "./SubmitButton";

import { LocationV2, Cuisine, Diet, Meal, Price } from "@/database.types";

import { SearchParams } from "../types";

type FiltersProps = {
  locations: LocationV2[];
  cuisines: Cuisine[];
  diets: Diet[];
  prices: Price[];
  meals: Meal[];
  isMapView?: boolean;
  handleCloseFilters?: () => void;
};

const Filters = ({
  locations,
  cuisines,
  diets,
  prices,
  meals,
  isMapView,
  handleCloseFilters
}: FiltersProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const locationParam = params.get(SearchParams.LOCATION) ?? "";
  const cuisineParam = params.get(SearchParams.CUISINE) ?? "";
  const dietParam = params.get(SearchParams.DIET) ?? "";
  const priceParam = params.get(SearchParams.PRICE) ?? "";
  const mealParam = params.get(SearchParams.MEAL) ?? "";

  const [stateSearchParams, setStateSearchParams] = useState({
    location: locationParam,
    cuisine: cuisineParam,
    diet: dietParam,
    price: priceParam,
    meal: mealParam,
  });

  return (
    <article className="flex flex-col gap-[15px] pb-[20px]">
      {!isMapView && (
        <LocationFilters
          locations={locations}
          setStateSearchParams={(value) =>
            setStateSearchParams({ ...stateSearchParams, location: value })
          }
          locationParam={locationParam}
        />
      )}
      <CuisineFilters
        cuisines={cuisines}
        setStateSearchParams={(value) =>
          setStateSearchParams({ ...stateSearchParams, cuisine: value })
        }
        cuisineParam={cuisineParam}
      />
      <DietFilters
        diets={diets}
        setStateSearchParams={(value) =>
          setStateSearchParams({ ...stateSearchParams, diet: value })
        }
        dietParam={dietParam}
      />
      <PriceFilters
        prices={prices}
        setStateSearchParams={(value) =>
          setStateSearchParams({ ...stateSearchParams, price: value })
        }
        priceParam={priceParam}
      />
      <MealFilters
        meals={meals}
        setStateSearchParams={(value) =>
          setStateSearchParams({ ...stateSearchParams, meal: value })
        }
        mealParam={mealParam}
      />

      <SubmitButton stateSearchParams={stateSearchParams} isMapView={isMapView} handleCloseFilters={handleCloseFilters} />
    </article>
  );
};

export default Filters;
