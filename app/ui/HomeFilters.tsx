"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import CuisineFilters from "./CuisineFilters";
import DietFilters from "./DietFilters";
import LocationFilters from "./LocationFilters";
import MealFilters from "./MealFilters";
import PriceFilters from "./PriceFilters";
import SubmitButton from "./SubmitButton";

import { Location, Cuisine, Diet, Meal, Price } from "@/database.types";

import { SearchParams } from "../types";

type HomeFiltersProps = {
  locations: Location[];
  cuisines: Cuisine[];
  diets: Diet[];
  prices: Price[];
  meals: Meal[];
};

const HomeFilters = ({
  locations,
  cuisines,
  diets,
  prices,
  meals,
}: HomeFiltersProps) => {
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
      <LocationFilters
        locations={locations}
        setStateSearchParams={(value) =>
          setStateSearchParams({ ...stateSearchParams, location: value })
        }
        locationParam={locationParam}
      />
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

      <SubmitButton stateSearchParams={stateSearchParams} />
    </article>
  );
};

export default HomeFilters;
