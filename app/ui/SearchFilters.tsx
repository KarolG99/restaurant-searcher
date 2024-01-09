"use client";

import { Location, Cuisine, Diet, Price, Meal } from "@/database.types";

import Filters from "./Filters";
import { useState } from "react";

type SearchFiltersProps = {
  locations: Location[];
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
        />
      )}
    </div>
  );
};

export default SearchFilters;
