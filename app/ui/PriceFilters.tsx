"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Price } from "@/database.types";

import Filter from "./Filter";
import { SearchParams } from "../types";

type PriceFiltersProps = {
  prices: Price[] | null;
  setStateSearchParams: (value: string) => void;
};

const PriceFilters = ({ prices, setStateSearchParams }: PriceFiltersProps) => {
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

  return prices && prices.length > 0 ? (
    <section>
      <p className="font-semibold ml-[2px] mb-[5px]">
        Average price {selectedIdsCount && `(${selectedIdsCount})`}
      </p>

      <p className=" text-s font-light ml-[3px] mt-[-3px] mb-[6px]">
        {prices.map((price, index) => {
          if (price.symbol && price.value) {
            return (
              <span key={`${price.symbol}_${price.value}`}>
                <b className=" font-medium">{price.symbol}</b> - {price.value}
                {", "}
              </span>
            );
          }
        })}
      </p>

      <div className="flex gap-[13px] items-center filtersWrapper">
        <Filter
          type="checkbox"
          id="0-any-price"
          name="Any"
          inputName="prices"
          onChange={() => {
            setAnyChecked((prev) => !prev);
            setSelectedIds([]);
          }}
          checked={isAnyChecked}
        />
        {prices.map((price, index) => (
          <Filter
            type="checkbox"
            key={`${price.id}_${index}`}
            id={`${price.id}-${price.symbol}`}
            name={price.symbol || ""}
            inputName="prices"
            checked={isAnyChecked ? false : undefined}
            onChange={() => {
              handleCheckboxChange(price.id.toString());
            }}
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default PriceFilters;
