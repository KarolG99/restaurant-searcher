"use client";

import React, { useState } from "react";

import { Diet, Meal } from "@/database.types";

import Filter from "./Filter";

type MealFiltersProps = {
  meals: Meal[] | null;
};

const MealFilters = ({ meals }: MealFiltersProps) => {
  const [isAnyChecked, setAnyChecked] = useState(false);

  return meals && meals.length > 0 ? (
    <section>
      <p className="font-semibold ml-[2px] mb-[5px]">Meal</p>

      <div className="flex gap-[13px] items-center filtersWrapper">
        <Filter
          type="checkbox"
          id="0-any-meal"
          name="Any"
          inputName="meals"
          onChange={() => setAnyChecked((prev) => !prev)}
          checked={isAnyChecked}
        />
        {meals.map((meal, index) => (
          <Filter
            type="checkbox"
            key={`${meal.id}_${index}`}
            id={`${meal.id}-${meal.name}`}
            name={meal.name || ""}
            inputName="meal"
            checked={isAnyChecked ? false : undefined}
            onChange={() => setAnyChecked(false)}
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default MealFilters;
