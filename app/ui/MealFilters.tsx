"use client";

import React, { useEffect, useState } from "react";

import { Meal } from "@/database.types";

import Filter from "./Filter";

type MealFiltersProps = {
  meals: Meal[] | null;
  setStateSearchParams: (value: string) => void;
  mealParam: string;
};

const MealFilters = ({
  meals,
  setStateSearchParams,
  mealParam: mealParamProps,
}: MealFiltersProps) => {
  const [isAnyChecked, setAnyChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedIdsCount = selectedIds.length > 0 ? selectedIds.length : null;

  const mealParam =
    mealParamProps.length > 0 ? mealParamProps.split(",").map(Number) : [];

  const handleCheckboxChange = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
    setAnyChecked(false);
  };

  useEffect(() => {
    if (mealParam.length > 0 && selectedIds.length === 0) {
      setSelectedIds(mealParam.map((el) => el.toString()));
    }
  }, []);

  useEffect(() => {
    if (selectedIds.length > 0) {
      setStateSearchParams(selectedIds.toString());
    } else {
      setStateSearchParams("");
    }
  }, [selectedIds]);

  return meals && meals.length > 0 ? (
    <section>
      <p className="font-semibold ml-[2px] mb-[5px] text-m">
        Meal {selectedIdsCount && `(${selectedIdsCount})`}
      </p>

      <div className="flex gap-[13px] items-center filtersWrapper">
        <Filter
          type="checkbox"
          id="0-any-meal"
          name="Any"
          inputName="meals"
          onChange={() => {
            setAnyChecked((prev) => !prev);
            setSelectedIds([]);
          }}
          checked={isAnyChecked}
        />
        {meals.map((meal, index) => (
          <Filter
            type="checkbox"
            key={`${meal.id}_${index}`}
            id={`${meal.id}-${meal.name}`}
            name={meal.name ?? ""}
            inputName="meal"
            checked={isAnyChecked ? false : undefined}
            onChange={() => {
              handleCheckboxChange(meal.id.toString());
            }}
            defaultChecked={
              mealParam.length > 0 ? mealParam.includes(meal.id) : false
            }
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default MealFilters;
