import React from "react";

import Filter from "./Filter";

import { Location } from "../../database.types";

type LocationFiltersProps = {
  locations: Location[] | null;
};

const LocationFilters = ({ locations }: LocationFiltersProps) => {
  return locations && locations.length > 0 ? (
    <section>
      <p className=" font-semibold ml-[2px] mb-[5px]">Location</p>

      <div className="flex gap-[13px] items-center filtersWrapper">
        <Filter id="0-any-location" name="Any" inputName="locations" />
        {locations.map((location, index) => (
          <Filter
            key={`${location.id}_${index}`}
            id={`${location.id}-${location.name}`}
            name={location.name || ""}
            inputName="locations"
          />
        ))}
      </div>
    </section>
  ) : null;
};

export default LocationFilters;
