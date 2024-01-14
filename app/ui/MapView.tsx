"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { RestaurantReviews } from "@/database.types";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

type MapViewProps = {
  centerLat: number;
  centerLong: number;
  zoom: number;
  handleCloseMap: () => void;
  restaurantInfo: {
    lat: number;
    long: number;
    name: string;
    reviews: RestaurantReviews;
    averagePriceSymbol: string;
  }[];
};

const MapView = ({
  centerLat,
  centerLong,
  zoom,
  handleCloseMap,
  restaurantInfo,
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
        const { name, lat, long, reviews, averagePriceSymbol } = restaurant;
        return (
          <Marker key={`${name}_${index}`} position={[long, lat]}>
            <Popup>
              {reviews.average} | {averagePriceSymbol}
            </Popup>
          </Marker>
        );
      })}

      <button
        onClick={handleCloseMap}
        className="close-map bg-black absolute bottom-[20px] text-background px-[15px] py-[6px] text-m rounded-md left-[50%] translate-x-[-50%]"
      >
        Close map
      </button>
    </MapContainer>
  );
};

export default MapView;
