"use client";

import { useMap } from "react-leaflet";
import supabase from "../services/supabase";
import { useState } from "react";
import MapMarker from "./MapMarker";
import { Json, Price, RestaurantReviews } from "@/database.types";

type SearchedMapRestaurantsProps = {
  prices?: Price[];
};

const SearchedMapRestaurants = ({ prices }: SearchedMapRestaurantsProps) => {
  const map = useMap();
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<
    {
      id: number;
      name: string;
      lat: number;
      long: number;
      reviews: Json;
      mainImage: string;
      address: string;
      averageprice: number[];
    }[]
  >([]);

  const handleSearchArea = async () => {
    const bounds = map.getBounds();
    const minLong = bounds.getSouthWest().lat;
    const minLat = bounds.getSouthWest().lng;
    const maxLong = bounds.getNorthEast().lat;
    const maxLat = bounds.getNorthEast().lng;
    setIsLoading(true);
    try {
      const { data } = await supabase.rpc("restaurants_in_view", {
        min_lat: minLat,
        min_long: minLong,
        max_lat: maxLat,
        max_long: maxLong,
      });
      setRestaurants(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => handleSearchArea()}
        className="map-button absolute bottom-[20px] left-[50%] translate-x-[-50%] bg-black text-background text-m px-[15px] py-[6px] rounded-lg"
      >
        {isLoading ? "Loading... " : "Search this area"}
      </button>

      {restaurants.map((restaurant, index) => {
        const { id, name, lat, long, reviews, mainImage, averageprice } =
          restaurant;
        const averagePriceId = averageprice?.[0];
        const averagePriceSymbol =
          prices?.find((price) => price.id === averagePriceId)?.symbol ?? "";

        const restaurantInfo = {
          id,
          name,
          lat,
          long,
          reviews: reviews as RestaurantReviews,
          mainImage,
          averagePriceSymbol,
        };

        return (
          <MapMarker
            key={`${restaurant.name}_${index}`}
            restaurant={restaurantInfo}
          />
        );
      })}
    </>
  );
};

export default SearchedMapRestaurants;
