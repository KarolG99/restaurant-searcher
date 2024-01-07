"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Cuisine } from "@/database.types";

import Filter from "./Filter";
import { SearchParams } from "../types";

type CuisineFiltersProps = {
  cuisines: Cuisine[] | null;
  setStateSearchParams: (value: string) => void;
};

const CuisineFilters = ({
  cuisines,
  setStateSearchParams,
}: CuisineFiltersProps) => {
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
            name={cuisine.name || ""}
            inputName="cuisines"
            checked={isAnyChecked ? false : undefined}
            onChange={() => {
              handleCheckboxChange(cuisine.id.toString());
            }}
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default CuisineFilters;
