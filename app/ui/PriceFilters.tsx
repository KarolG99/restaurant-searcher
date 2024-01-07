"use client";

import React, { useState } from "react";

import { Price } from "@/database.types";

import Filter from "./Filter";

type PriceFiltersProps = {
  prices: Price[] | null;
};

const PriceFilters = ({ prices }: PriceFiltersProps) => {
  const [isAnyChecked, setAnyChecked] = useState(false);

  return prices && prices.length > 0 ? (
    <section>
      <p className="font-semibold ml-[2px] mb-[5px]">Average price</p>

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
          onChange={() => setAnyChecked((prev) => !prev)}
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
            onChange={() => setAnyChecked(false)}
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default PriceFilters;
