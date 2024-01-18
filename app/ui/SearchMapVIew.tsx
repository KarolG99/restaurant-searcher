"use client";

import { LocationV2, Price } from "@/database.types";
import MapView from "./MapView";
import { MapContainer, TileLayer } from "react-leaflet";
import CloseIcon from "../icons/CloseIcon";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import SearchedMapRestaurants from "./SearchedMapRestaurants";
import { Languages } from "../types";
import { Routes } from "../config/routes";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type SearchMapViewProps = {
  cuisineParam: string;
  dietParam: string;
  priceParam: string;
  mealParam: string;
  locale: Languages;
  prices: Price[];
  selectedLocation?: LocationV2;
};

const SearchMapView = ({
  cuisineParam,
  dietParam,
  priceParam,
  mealParam,
  locale,
  prices,
  selectedLocation,
}: SearchMapViewProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const centerLong = selectedLocation ? selectedLocation.long : 50.06;
  const centerLat = selectedLocation ? selectedLocation.lat : 19.56;

  const searchUrl = `/${locale}${Routes.SEARCH}?${params.toString()}`;

  return (
    <div className="fixed bg-[#0000009a] top-0 left-0 w-full h-full z-[9]">
      <div className="fixed z-10 bottom-0 left-0 w-full h-[100%] xl:max-w-[1280px] xl:left-[50%] xl:translate-x-[-50%]">
        <MapContainer
          center={[centerLong, centerLat]}
          zoom={selectedLocation ? 12 : 8}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Link
            href={searchUrl}
            className="map-button bg-black absolute top-[10px] text-background text-m rounded-full right-[10px] w-[30px] h-[30px] flex items-center justify-center"
          >
            <CloseIcon fill="white" />
          </Link>

          <SearchedMapRestaurants
            cuisineParam={cuisineParam}
            dietParam={dietParam}
            priceParam={priceParam}
            mealParam={mealParam}
            locale={locale}
            prices={prices}
          />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default SearchMapView;
