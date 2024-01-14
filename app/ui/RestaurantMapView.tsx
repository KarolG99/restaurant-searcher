"use client";

import MapIcon from "../icons/MapIcon";
import { useState } from "react";
import MapView from "./MapView";
import { RestaurantReviews } from "@/database.types";

type RestaurantMapViewProps = {
  restaurantInfo: {
    lat: number;
    long: number;
    name: string;
    reviews: RestaurantReviews;
    averagePriceSymbol: string;
  };
};

const RestaurantMapView = ({ restaurantInfo }: RestaurantMapViewProps) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMapOpen(true)}
        className=" bg-black text-background w-fit px-[13px] py-[5px] rounded-md flex justify-center items-center gap-[8px]"
      >
        See on the map <MapIcon fill="#F5F5DC" />
      </button>

      {isMapOpen && (
        <div className="fixed bg-[#0000009a] top-0 left-0 w-full h-full z-[9]">
          <div className="fixed z-10 bottom-0 left-0 w-full h-[93%] xl:max-w-[1280px] xl:left-[50%] xl:translate-x-[-50%]">
            <MapView
              centerLat={restaurantInfo.lat}
              centerLong={restaurantInfo.long}
              zoom={16}
              handleCloseMap={() => setIsMapOpen(false)}
              restaurantInfo={[restaurantInfo]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantMapView;
