"use client";

import { Location, Cuisine, Diet, Meal, Price } from "@/database.types";
import CuisineFilters from "./CuisineFilters";
import DietFilters from "./DietFilters";
import LocationFilters from "./LocationFilters";
import MealFilters from "./MealFilters";
import PriceFilters from "./PriceFilters";
import SubmitButton from "./SubmitButton";
import { useState } from "react";

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
  const [stateSearchParams, setStateSearchParams] = useState({
    location: "",
    cuisine: "",
    diet: "",
    price: "",
    meal: "",
  });

  return (
    <article className="flex flex-col gap-[15px] pb-[20px]">
      <LocationFilters
        locations={locations}
        setStateSearchParams={(value) =>
          setStateSearchParams({ ...stateSearchParams, location: value })
        }
      />
      <CuisineFilters
        cuisines={cuisines}
        setStateSearchParams={(value) =>
          setStateSearchParams({ ...stateSearchParams, cuisine: value })
        }
      />
      <DietFilters
        diets={diets}
        setStateSearchParams={(value) =>
          setStateSearchParams({ ...stateSearchParams, diet: value })
        }
      />
      <PriceFilters
        prices={prices}
        setStateSearchParams={(value) =>
          setStateSearchParams({ ...stateSearchParams, price: value })
        }
      />
      <MealFilters
        meals={meals}
        setStateSearchParams={(value) =>
          setStateSearchParams({ ...stateSearchParams, meal: value })
        }
      />

      <SubmitButton stateSearchParams={stateSearchParams} />
    </article>
  );
};

export default HomeFilters;
