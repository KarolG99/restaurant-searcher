"use client";

import React, { useEffect, useState } from "react";

import Filter from "./Filter";

import { Cuisine } from "@/database.types";

type CuisineFiltersProps = {
  cuisines: Cuisine[] | null;
  setStateSearchParams: (value: string) => void;
  cuisineParam: string;
};

const CuisineFilters = ({
  cuisines,
  setStateSearchParams,
  cuisineParam: cuisineParamProps,
}: CuisineFiltersProps) => {
  const [isAnyChecked, setAnyChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedIdsCount = selectedIds.length > 0 ? selectedIds.length : null;

  const cuisineParam = cuisineParamProps.split(",").map(Number) ?? [];

  const handleCheckboxChange = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
    setAnyChecked(false);
  };

  useEffect(() => {
    if (cuisineParam.length > 0 && selectedIds.length === 0) {
      setSelectedIds(cuisineParam.map((el) => el.toString()));
    }
  }, []);

  useEffect(() => {
    if (selectedIds.length > 0) {
      setStateSearchParams(selectedIds.toString());
    } else {
      setStateSearchParams("");
    }
  }, [selectedIds]);

  return cuisines && cuisines.length > 0 ? (
    <section>
      <p className="font-semibold ml-[2px] mb-[5px]">
        Cuisine {selectedIdsCount && `(${selectedIdsCount})`}
      </p>

      <div className="flex gap-[13px] items-center filtersWrapper">
        <Filter
          type="checkbox"
          id="0-any-cuisine"
          name="Any"
          inputName="cuisines"
          onChange={() => {
            setAnyChecked((prev) => !prev);
            setSelectedIds([]);
          }}
          checked={isAnyChecked}
        />
        {cuisines.map((cuisine, index) => (
          <Filter
            type="checkbox"
            key={`${cuisine.id}_${index}`}
            id={`${cuisine.id}-${cuisine.name}`}
            name={cuisine.name ?? ""}
            inputName="cuisines"
            checked={isAnyChecked ? false : undefined}
            onChange={() => {
              handleCheckboxChange(cuisine.id.toString());
            }}
            defaultChecked={
              cuisineParam.length > 0
                ? cuisineParam.includes(cuisine.id)
                : false
            }
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default CuisineFilters;
