import Image from "next/image";

import supabase from "@/app/services/supabase";
import { Languages } from "@/app/types";
import { LocationV2, Restaurant } from "@/database.types";
import BackButton from "@/app/ui/BackButton";
import { Routes } from "@/app/config/routes";
import StarIconFilled from "@/app/icons/StarIconFilled";

type RestaurantProps = {
  params: {
    locale: Languages;
    slug: string;
  };
};

export default async function Restaurant({
  params: { locale, slug },
}: RestaurantProps) {
  const restaurantId = Number(slug.split("-")[0]);
  const { data } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", Number(restaurantId));
  const restaurant: Restaurant = data?.[0];

  const [
    locationsResponse,
    cuisinesResponse,
    dietsResponse,
    pricesResponse,
    mealsResponse,
  ] = await Promise.all([
    supabase.rpc("get_location_data"),
    supabase.from("cuisines").select("*"),
    supabase.from("diets").select("*"),
    supabase.from("prices").select("*"),
    supabase.from("meals").select("*"),
  ]);
  const locations: LocationV2[] = locationsResponse.data ?? [];
  const cuisines = cuisinesResponse.data ?? [];
  const diets = dietsResponse.data ?? [];
  const prices = pricesResponse.data ?? [];
  const meals = mealsResponse.data ?? [];

  const averagePriceId = restaurant.averagePrice?.[0];
  const averagePrice = prices?.find((price) => price.id === averagePriceId);

  return (
    <>
      <BackButton goBack text="Back" />

      <article className="flex flex-col md:flex-row md:gap-[20px]">
        <div className="relative w-[full] h-[200px] md:w-3/5 lg:h-[250px] lg:w-4/6">
          <Image
            src={restaurant.mainImage || ""}
            alt={`Image of ${restaurant.name}`}
            fill
            style={{
              objectFit: "cover",
              borderRadius: "10px",
            }}
            priority
          />
        </div>

        <section className="flex flex-col gap-[10px] mt-[10px] md:gap-[15px] md:mt-0">
          <h1 className=" text-xl font-black">{restaurant.name}</h1>

          <p className=" text-s">{restaurant.address}</p>

          <p className="flex gap-[10px]">
            <span className=" flex items-center gap-[2px]">
              {typeof restaurant.reviews === "object" &&
              restaurant.reviews !== null ? (
                <>
                  {restaurant.reviews.average}{" "}
                  <StarIconFilled width="17" height="14" /> |{" "}
                  <small className=" text-s">{restaurant.reviews.total}</small>
                </>
              ) : (
                ""
              )}
            </span>

            <span> | </span>

            <span className=" font-medium">{averagePrice.symbol}</span>
          </p>
        </section>
      </article>

      <article className="mt-[30px]">
        {restaurant.description && (
          <section className="md:w-3/5 lg:w-4/6">
            {restaurant.description}
          </section>
        )}
      </article>
    </>
  );
}
