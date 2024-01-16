"use client";

import { useState } from "react";
import MapIcon from "../icons/MapIcon";
import { LocationV2, Price } from "@/database.types";
import { useSearchParams } from "next/navigation";
import { SearchParams } from "../types";
import MapView from "./MapView";

type SearchMapViewProps = {
  locations: LocationV2[];
  prices: Price[];
};

const SearchMapView = ({ locations, prices }: SearchMapViewProps) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const locationParam = params.get(SearchParams.LOCATION) ?? null;
  const selectedLocation =
    locationParam &&
    locations.find((location) => Number(locationParam) === location.id);

  return (
    <>
      {!isMapOpen && (
        <button
          onClick={() => setIsMapOpen(true)}
          className="bg-black flex justify-center items-center text-background gap-[8px] px-[15px] py-[5px] rounded-full fixed bottom-[15px] left-[50%] translate-x-[-50%] z-10"
        >
          Open map <MapIcon fill="#F5F5DC" />
        </button>
      )}

      {isMapOpen && (
        <div className="fixed bg-[#0000009a] top-0 left-0 w-full h-full z-[9]">
          <div className="fixed z-10 bottom-0 left-0 w-full h-[93%] xl:max-w-[1280px] xl:left-[50%] xl:translate-x-[-50%]">
            <MapView
              centerLat={selectedLocation ? selectedLocation.lat : 19.57}
              centerLong={selectedLocation ? selectedLocation.long : 50.03}
              zoom={selectedLocation ? 12 : 8}
              handleCloseMap={() => setIsMapOpen(false)}
              restaurantInfo={[]}
              isSearchMap
              prices={prices}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchMapView;
