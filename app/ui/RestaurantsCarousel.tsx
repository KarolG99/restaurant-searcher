"use client";

import React from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { Cuisine, Diet, LocationV2, Price, Restaurant } from "@/database.types";

import RestaurantCard from "./RestaurantCard";
import { Languages } from "../types";

type RestaurantsCarouselProps = {
  restaurants: Restaurant[] | null;
  prices: Price[] | null;
  cuisines: Cuisine[] | null;
  diets: Diet[] | null;
  locale: Languages;
  location?: LocationV2 | null;
  title?: string;
};

const RestaurantsCarousel = ({
  restaurants,
  prices,
  cuisines,
  diets,
  locale,
  location,
  title = "",
}: RestaurantsCarouselProps) => {
  const showLocation = !!location;

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
      <h2 className=" text-l font-bold">
        {showLocation ? `Restaurants in ${location?.name}` : title}
      </h2>

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
              locale={locale}
            />
          </SplideSlide>
        ))}
      </Splide>
    </article>
  );
};

export default RestaurantsCarousel;
