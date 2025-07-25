import React from "react";
import Image from "next/image";

import {
  Cuisine,
  Diet,
  Price,
  Restaurant,
  RestaurantReviews,
} from "@/database.types";

import StarIconFilled from "../icons/StarIconFilled";
import RestaurantPlaceholder from "@/public/restaurantPlaceholder.webp";
import Link from "next/link";
import { Languages } from "../types";
import { Routes } from "../config/routes";

type RestaurantCardProps = {
  restaurant: Restaurant;
  prices: Price[] | null;
  cuisines: Cuisine[] | null;
  diets: Diet[] | null;
  locale: Languages;
};

const RestaurantCard = ({
  restaurant,
  prices,
  cuisines,
  diets,
  locale,
}: RestaurantCardProps) => {
  const averagePriceId = restaurant.averagePrice?.[0];
  const averagePrice = prices?.find((price) => price.id === averagePriceId);

  const reviews = restaurant.reviews as RestaurantReviews;

  const restaurantCuisines =
    (restaurant.cuisine &&
      cuisines
        ?.filter((cuisine) => restaurant.cuisine?.includes(cuisine.id))
        .map((cuisine) => cuisine.name)) ||
    [];
  const restaurantDiets =
    (restaurant.diet &&
      diets
        ?.filter((diet) => restaurant.diet?.includes(diet.id))
        .map((diet) => diet.name)) ||
    [];

  const distanceInKm = restaurant.dist_meters
    ? Math.fround(restaurant.dist_meters / 1000).toFixed(2)
    : null;

  const slug = restaurant.name?.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/${locale}${Routes.RESTAURANT}/${restaurant.id}${
        slug && "-" + slug
      }`}
    >
      <section className=" w-full h-auto my-[10px] flex-col">
        <div className="w-full h-[150px] rounded-t-[10px] relative">
          <Image
            src={restaurant.mainImage ?? RestaurantPlaceholder}
            alt={`Main image of ${restaurant.name} restaurant`}
            fill
            sizes="100%"
            className="rounded-[10px]"
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        <div className="px-[5px] py-[5px]">
          <h3 className=" font-bold line-clamp-2 notranslate">{restaurant.name}</h3>

          <p className=" flex justify-between">
            <span className=" flex items-center gap-[2px] notranslate">
              {typeof reviews === "object" && reviews !== null ? (
                <>
                  {reviews.average} <StarIconFilled width="17" height="14" /> |{" "}
                  <small className=" text-s">{reviews.total}</small>
                </>
              ) : (
                ""
              )}
            </span>

            <span className=" font-medium">{averagePrice?.symbol}</span>
          </p>

          <p className=" text-s mb-[2px] notranslate">{restaurant.address}</p>

          {distanceInKm && (
            <p className=" text-s mb-[2px] notranslate">
              <span className="font-bold">≈{distanceInKm} km</span> from
              downtown
            </p>
          )}

          {restaurantCuisines.length > 0 ? (
            <p className="text-s line-clamp-1">
              <b>Cuisines:</b> {restaurantCuisines.join(" ᐧ ")}
            </p>
          ) : null}

          {restaurantDiets.length > 0 ? (
            <p className="text-s line-clamp-1">
              <b>Diets:</b> {restaurantDiets.join(" ᐧ ")}
            </p>
          ) : null}
        </div>
      </section>
    </Link>
  );
};

export default RestaurantCard;
