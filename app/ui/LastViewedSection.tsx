"use client";

import { Cuisine, Diet, Price, Restaurant } from "@/database.types";
import { useEffect, useState } from "react";
import { getLastViewed } from "../utils/lastViewed";
import RestaurantsCarousel from "./RestaurantsCarousel";
import { Languages } from "../types";

type RestaurantsCarouselProps = {
  prices: Price[] | null;
  cuisines: Cuisine[] | null;
  diets: Diet[] | null;
  locale: Languages;
};

const LastViewedSection = ({
  prices,
  cuisines,
  diets,
  locale,
}: RestaurantsCarouselProps) => {
  const [lastViewedRestaurants, setLastViewedRestaurants] = useState<
    Restaurant[]
  >([]);

  useEffect(() => {
    getLastViewed().then((res) => {
      if (res) {
        setLastViewedRestaurants(res);
      }
    });
  }, []);

  return (
    <div className=" min-h-[293px]">
      <RestaurantsCarousel
        restaurants={lastViewedRestaurants}
        prices={prices}
        cuisines={cuisines}
        diets={diets}
        locale={locale}
        title="Last viewed"
      />
    </div>
  );
};

export default LastViewedSection;
