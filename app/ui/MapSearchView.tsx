"use client";

import { LocationV2, Price } from "@/database.types";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon, point } from "leaflet";

import CloseIcon from "../icons/CloseIcon";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import SearchedMapRestaurants from "./SearchedMapRestaurants";
import { Languages } from "../types";
import { Routes } from "../config/routes";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FilterIcon from "../icons/FilterIcon";
import { useState } from "react";
import Filters from "./Filters";

type MapSearchViewProps = {
  cuisineParam: string;
  dietParam: string;
  priceParam: string;
  mealParam: string;
  locations: any[];
  cuisines: any[];
  diets: any[];
  prices: Price[];
  meals: any[];
  locale: Languages;
  selectedLocation?: LocationV2;
};

const MapSearchView = ({
  cuisineParam,
  dietParam,
  priceParam,
  mealParam,
  locations,
  cuisines,
  diets,
  prices,
  meals,
  locale,
  selectedLocation,
}: MapSearchViewProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const centerLong = selectedLocation ? selectedLocation.long : 50.06;
  const centerLat = selectedLocation ? selectedLocation.lat : 19.56;

  const searchUrl = `/${locale}${Routes.SEARCH}?${params.toString()}`;

  const createCustomClusterIcon = (cluster: any) => {
    return divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

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
          maxZoom={18}
          scrollWheelZoom={false}
        >
          <button
            onClick={() => setIsFiltersOpen((prev) => !prev)}
            className="map-button absolute top-[10px] right-[50%] translate-x-[50%] flex gap-[5px] text-m justify-center items-center bg-black text-white font-bold px-[8px] py-[3px] rounded-md"
          >
            Filters <FilterIcon fill="white" />
          </button>

          <Link
            href={searchUrl}
            className="map-button bg-black absolute top-[10px] text-background text-m rounded-full right-[10px] w-[30px] h-[30px] flex items-center justify-center"
          >
            <CloseIcon fill="white" />
          </Link>

          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomClusterIcon}
            maxClusterRadius={120}
            spiderfyOnMaxZoom={true}
            polygonOptions={{
              fillColor: "#ffffff",
              color: "#000",
              weight: 2,
              opacity: 1,
              fillOpacity: 0.8,
            }}
            showCoverageOnHover={true}
            removeOutsideVisibleBounds={false}
          >
            <SearchedMapRestaurants
              cuisineParam={cuisineParam}
              dietParam={dietParam}
              priceParam={priceParam}
              mealParam={mealParam}
              locale={locale}
              prices={prices}
            />
          </MarkerClusterGroup>

          {isFiltersOpen && (
            <div className="map-button absolute top-0 left-0 w-full h-full bg-background p-[15px] overflow-y-scroll flex flex-col">
              <button
                onClick={() => setIsFiltersOpen(false)}
                className="text-m font-bold mb-[20px] self-center underline"
              >
                Close filters
              </button>

              <Filters
                locations={locations}
                cuisines={cuisines}
                diets={diets}
                prices={prices}
                meals={meals}
                isMapView
                handleCloseFilters={() => setIsFiltersOpen(false)}
              />
            </div>
          )}

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapSearchView;
