"use client";

import React, { useEffect, useState } from "react";

import { Diet } from "@/database.types";

import Filter from "./Filter";

type DietFiltersProps = {
  diets: Diet[] | null;
  setStateSearchParams: (value: string) => void;
  dietParam: string;
};

const DietFilters = ({
  diets,
  setStateSearchParams,
  dietParam: dietParamProps,
}: DietFiltersProps) => {
  const [isAnyChecked, setAnyChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedIdsCount = selectedIds.length > 0 ? selectedIds.length : null;

  const dietParam = dietParamProps.split(",").map(Number) ?? [];

  const handleCheckboxChange = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
    setAnyChecked(false);
  };

  useEffect(() => {
    if (dietParam.length > 0 && selectedIds.length === 0) {
      setSelectedIds(dietParam.map((el) => el.toString()));
    }
  }, []);

  useEffect(() => {
    if (selectedIds.length > 0) {
      setStateSearchParams(selectedIds.toString());
    } else {
      setStateSearchParams("");
    }
  }, [selectedIds]);

  return diets && diets.length > 0 ? (
    <section>
      <p className="font-semibold ml-[2px] mb-[5px]">
        Diet {selectedIdsCount && `(${selectedIdsCount})`}
      </p>

      <div className="flex gap-[13px] items-center filtersWrapper">
        <Filter
          type="checkbox"
          id="0-any-diet"
          name="Any"
          inputName="diets"
          onChange={() => {
            setAnyChecked((prev) => !prev);
            setSelectedIds([]);
          }}
          checked={isAnyChecked}
        />
        {diets.map((diet, index) => (
          <Filter
            type="checkbox"
            key={`${diet.id}_${index}`}
            id={`${diet.id}-${diet.name}`}
            name={diet.name ?? ""}
            inputName="diets"
            checked={isAnyChecked ? false : undefined}
            onChange={() => {
              handleCheckboxChange(diet.id.toString());
            }}
            defaultChecked={
              dietParam.length > 0 ? dietParam.includes(diet.id) : false
            }
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default DietFilters;
