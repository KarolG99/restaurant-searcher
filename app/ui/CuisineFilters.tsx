import React from "react";

import { Cuisine } from "@/database.types";

import Filter from "./Filter";

type CuisineFiltersProps = {
  cuisines: Cuisine[] | null;
};

const CuisineFilters = ({ cuisines }: CuisineFiltersProps) => {
  return cuisines && cuisines.length > 0 ? (
    <section>
      <p className="font-semibold ml-[2px] mb-[5px]">Cuisine</p>

      <div className="flex gap-[13px] items-center filtersWrapper">
        <Filter id="0-any-cuisine" name="Any" inputName="cuisines" />
        {cuisines.map((cuisine, index) => (
          <Filter
            key={`${cuisine.id}_${index}`}
            id={`${cuisine.id}-${cuisine.name}`}
            name={cuisine.name || ""}
            inputName="cuisines"
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default CuisineFilters;
