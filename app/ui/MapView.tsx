"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { icon } from "leaflet";
import Image from "next/image";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { Price, RestaurantReviews } from "@/database.types";

import MarkerImg from "@/public/marker.png";

import CloseIcon from "../icons/CloseIcon";
import MapMarker from "./MapMarker";
import SearchedMapRestaurants from "./SearchedMapRestaurants";

type MapViewProps = {
  centerLat: number;
  centerLong: number;
  zoom: number;
  handleCloseMap: () => void;
  restaurantInfo: {
    id: number;
    lat: number;
    long: number;
    name: string;
    reviews: RestaurantReviews;
    averagePriceSymbol: string;
    mainImage: string;
  }[];
  isSearchMap?: boolean;
  prices?: Price[];
};

const MapView = ({
  centerLat,
  centerLong,
  zoom,
  handleCloseMap,
  restaurantInfo,
  isSearchMap,
  prices,
}: MapViewProps) => {
  return (
    <MapContainer
      center={[centerLong, centerLat]}
      zoom={zoom}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "15px 15px 0 0",
        position: "relative",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {restaurantInfo.map((restaurant, index) => {
        return (
          <MapMarker
            key={`${restaurant.name}_${index}`}
            restaurant={restaurant}
          />
        );
      })}

      <button
        onClick={handleCloseMap}
        className="map-button bg-black absolute top-[10px] text-background text-m rounded-full right-[10px] w-[30px] h-[30px] flex items-center justify-center"
      >
        <CloseIcon fill="white" />
      </button>
    </MapContainer>
  );
};

export default MapView;
