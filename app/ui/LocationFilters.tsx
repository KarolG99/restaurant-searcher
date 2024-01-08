"use client";

import React from "react";

import Filter from "./Filter";

import { Location } from "../../database.types";

type LocationFiltersProps = {
  locations: Location[] | null;
  setStateSearchParams: (value: string) => void;
  locationParam: string;
};

const LocationFilters = ({
  locations,
  setStateSearchParams,
  locationParam,
}: LocationFiltersProps) => {
  return locations && locations.length > 0 ? (
    <section>
      <p className=" font-semibold ml-[2px] mb-[5px]">Location</p>

      <div className="flex gap-[13px] items-center filtersWrapper">
        <Filter
          type="radio"
          id="0-any-location"
          name="Any"
          inputName="locations"
          onChange={() => setStateSearchParams("")}
        />
        {locations.map((location, index) => (
          <Filter
            type="radio"
            key={`${location.id}_${index}`}
            id={`${location.id}-${location.name}`}
            name={location.name ?? ""}
            inputName="locations"
            onChange={() => setStateSearchParams(location.id.toString())}
            defaultChecked={
              locationParam ? Number(locationParam) === location.id : false
            }
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default LocationFilters;
