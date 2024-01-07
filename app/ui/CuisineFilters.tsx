"use client";

import React, { useState } from "react";

import { Cuisine } from "@/database.types";

import Filter from "./Filter";

type CuisineFiltersProps = {
  cuisines: Cuisine[] | null;
};

const CuisineFilters = ({ cuisines }: CuisineFiltersProps) => {
  const [isAnyChecked, setAnyChecked] = useState(false);

  return cuisines && cuisines.length > 0 ? (
    <section>
      <p className="font-semibold ml-[2px] mb-[5px]">Cuisine</p>

      <div className="flex gap-[13px] items-center filtersWrapper">
        <Filter
          type="checkbox"
          id="0-any-cuisine"
          name="Any"
          inputName="cuisines"
          onChange={() => setAnyChecked((prev) => !prev)}
          checked={isAnyChecked}
        />
        {cuisines.map((cuisine, index) => (
          <Filter
            type="checkbox"
            key={`${cuisine.id}_${index}`}
            id={`${cuisine.id}-${cuisine.name}`}
            name={cuisine.name || ""}
            inputName="cuisines"
            checked={isAnyChecked ? false : undefined}
            onChange={() => setAnyChecked(false)}
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default CuisineFilters;
