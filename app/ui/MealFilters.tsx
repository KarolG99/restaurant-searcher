"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Meal } from "@/database.types";

import Filter from "./Filter";
import { SearchParams } from "../types";

type MealFiltersProps = {
  meals: Meal[] | null;
  setStateSearchParams: (value: string) => void;
};

const MealFilters = ({ meals, setStateSearchParams }: MealFiltersProps) => {
  const [isAnyChecked, setAnyChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedIdsCount = selectedIds.length > 0 ? selectedIds.length : null;

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleCheckboxChange = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
    setAnyChecked(false);
  };

  useEffect(() => {
    if (selectedIds.length > 0) {
      setStateSearchParams(selectedIds.toString());
    } else {
      setStateSearchParams("");
    }
  }, [selectedIds]);

  return meals && meals.length > 0 ? (
    <section>
      <p className="font-semibold ml-[2px] mb-[5px]">
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
            name={meal.name || ""}
            inputName="meal"
            checked={isAnyChecked ? false : undefined}
            onChange={() => {
              handleCheckboxChange(meal.id.toString());
            }}
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default MealFilters;
