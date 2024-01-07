"use client";

import React, { useState } from "react";

import { Diet } from "@/database.types";

import Filter from "./Filter";

type DietFiltersProps = {
  diets: Diet[] | null;
};

const DietFilters = ({ diets }: DietFiltersProps) => {
  const [isAnyChecked, setAnyChecked] = useState(false);

  return diets && diets.length > 0 ? (
    <section>
      <p className="font-semibold ml-[2px] mb-[5px]">Diet</p>

      <div className="flex gap-[13px] items-center filtersWrapper">
        <Filter
          type="checkbox"
          id="0-any-diet"
          name="Any"
          inputName="diets"
          onChange={() => setAnyChecked((prev) => !prev)}
          checked={isAnyChecked}
        />
        {diets.map((diet, index) => (
          <Filter
            type="checkbox"
            key={`${diet.id}_${index}`}
            id={`${diet.id}-${diet.name}`}
            name={diet.name || ""}
            inputName="diets"
            checked={isAnyChecked ? false : undefined}
            onChange={() => setAnyChecked(false)}
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default DietFilters;
