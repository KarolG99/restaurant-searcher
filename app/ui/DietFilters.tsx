"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Diet } from "@/database.types";

import Filter from "./Filter";
import { SearchParams } from "../types";

type DietFiltersProps = {
  diets: Diet[] | null;
  setStateSearchParams: (value: string) => void;
};

const DietFilters = ({ diets, setStateSearchParams }: DietFiltersProps) => {
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
            name={diet.name || ""}
            inputName="diets"
            checked={isAnyChecked ? false : undefined}
            onChange={() => {
              handleCheckboxChange(diet.id.toString());
            }}
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default DietFilters;
