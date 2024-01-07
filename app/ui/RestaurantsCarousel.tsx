"use client";

import React from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { Cuisine, Diet, Location, Price, Restaurant } from "@/database.types";

import RestaurantCard from "./RestaurantCard";

type RestaurantsCarouselProps = {
  restaurants: Restaurant[] | null;
  location: Location | null;
  prices: Price[] | null;
  cuisines: Cuisine[] | null;
  diets: Diet[] | null;
};

const RestaurantsCarousel = ({
  restaurants,
  location,
  prices,
  cuisines,
  diets
}: RestaurantsCarouselProps) => {
  const splideOptions = {
    perPage: 3,
    gap: "15px",
    breakpoints: {
      980: {
        perPage: 2,
      },
      640: {
        perPage: 1,
      },
    },
  };

  return (
    <article className=" mt-[60px] pb-[15px]">
      <h2 className=" text-l font-bold">Restaurants in {location?.name}</h2>

      <Splide
        aria-label={`Restaurants in ${location?.name}`}
        options={splideOptions}
      >
        {restaurants?.map((restaurant, index) => (
          <SplideSlide key={`${restaurant.id}_${index}`}>
            <RestaurantCard
              restaurant={restaurant}
              prices={prices}
              cuisines={cuisines}
              diets={diets}
            />
          </SplideSlide>
        ))}
      </Splide>
    </article>
  );
};

export default RestaurantsCarousel;
