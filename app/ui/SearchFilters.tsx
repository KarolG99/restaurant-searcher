"use client";

import { Cuisine, Diet, Price, Meal, LocationV2 } from "@/database.types";

import Filters from "./Filters";
import { useState } from "react";

type SearchFiltersProps = {
  locations: LocationV2[];
  cuisines: Cuisine[];
  diets: Diet[];
  prices: Price[];
  meals: Meal[];
};

const SearchFilters = ({
  locations,
  cuisines,
  diets,
  prices,
  meals,
}: SearchFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        className=" font-bold underline mb-[10px]"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        {showFilters ? "Hide filters" : "Show filters"}
      </button>

      {showFilters && (
        <Filters
          locations={locations}
          cuisines={cuisines}
          diets={diets}
          prices={prices}
          meals={meals}
          handleCloseFilters={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default SearchFilters;
