import Image from "next/image";
import { Metadata } from "next";

import supabase from "@/app/services/supabase";
import { Languages } from "@/app/types";
import { LocationV2, Restaurant, RestaurantReviews } from "@/database.types";
import BackButton from "@/app/ui/BackButton";
import StarIconFilled from "@/app/icons/StarIconFilled";
import MapIcon from "@/app/icons/MapIcon";
import ExternalLinkIcon from "@/app/icons/ExternalLinkIcon";
import {
  metadataImageUrl,
  metadataSiteName,
  metadataUrl,
  revalidateTime,
} from "@/app/config/base";
import { getDictionary } from "@/app/dictionaries/getDictionary";
import RestaurantMapView from "@/app/ui/RestaurantMapView";

export const revalidate = revalidateTime;

type RestaurantParamsType = {
  params: {
    locale: Languages;
    slug: string;
  };
};

export async function generateMetadata({
  params: { locale, slug },
}: RestaurantParamsType): Promise<Metadata> {
  const dictionary = getDictionary(locale);

  const restaurantId = Number(slug.split("-")[0]);
  const { data } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", Number(restaurantId));
  const restaurant: Restaurant = data?.[0];

  return {
    title: `${dictionary.common.metadata.title} | ${restaurant.name}`,
    description: `${dictionary.common.metadata.title} ${
      restaurant.description ? "| " + restaurant.description : ""
    }`,
    openGraph: {
      title: `${dictionary.common.metadata.title} | ${restaurant.name}`,
      siteName: metadataSiteName,
      url: `${metadataUrl}/${slug}`,
      description: dictionary.common.metadata.description,
      type: "website",
      images: [
        {
          url: restaurant.mainImage ?? metadataImageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title: `${dictionary.common.metadata.title} | ${restaurant.name}`,
      images: [
        {
          url: restaurant.mainImage ?? metadataImageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Restaurant({
  params: { locale, slug },
}: RestaurantParamsType) {
  const restaurantId = Number(slug.split("-")[0]);
  const { data } = await supabase.rpc("restaurant_info", {
    restaurant_id: Number(restaurantId),
  });
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
  const restaurantMeals =
    (restaurant.meal &&
      meals
        ?.filter((meal) => restaurant.meal?.includes(meal.id))
        .map((meal) => meal.name)) ||
    [];

  return (
    <>
      <BackButton goBack text="Back" locale={locale} />

      <article className="flex flex-col border-b-[1px] border-black pb-[15px] md:flex-row md:gap-[20px] md:border-none">
        <div className="relative w-[full] h-[200px] md:w-3/5 lg:h-[250px] lg:w-4/6">
          <Image
            src={restaurant.mainImage ?? ""}
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

          <p className="flex gap-[10px] flex-wrap">
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

            <span className=" font-medium">
              {averagePrice.symbol}{" "}
              <small className="text-s font-normal">
                ({averagePrice.value})
              </small>
            </span>
          </p>

          {restaurant.lat && restaurant.long && (
            <RestaurantMapView
              restaurantInfo={{
                lat: restaurant.lat,
                long: restaurant.long,
                name: restaurant.name ?? "",
                averagePriceSymbol: averagePrice.symbol,
                reviews: restaurant.reviews as RestaurantReviews,
                mainImage: restaurant.mainImage || "",
              }}
            />
          )}
        </section>
      </article>

      <article className="py-[10px] flex flex-col gap-[18px]  md:py-0 md:w-3/5 lg:w-4/6">
        <section className="flex gap-[15px]">
          {restaurant.websiteUrl && (
            <a
              href={restaurant.websiteUrl}
              target="_blank"
              className="flex justify-center items-center w-fit gap-[4px] border-b-[1px] border-black"
            >
              website <ExternalLinkIcon />
            </a>
          )}

          {restaurant.menu && (
            <a
              href={restaurant.menu}
              target="_blank"
              className="flex justify-center items-center w-fit gap-[4px] border-b-[1px] border-black"
            >
              menu <ExternalLinkIcon />
            </a>
          )}
        </section>

        {restaurant.description && (
          <section className="font-medium">{restaurant.description}</section>
        )}

        {restaurantCuisines.length > 0 ? (
          <section>
            <h2 className="font-bold text-s uppercase">Cuisines</h2>
            <p>{restaurantCuisines.join(" ᐧ ")}</p>
          </section>
        ) : null}

        {restaurantDiets.length > 0 ? (
          <section>
            <h2 className="font-bold text-s uppercase">Diets</h2>
            <p>{restaurantDiets.join(" ᐧ ")}</p>
          </section>
        ) : null}

        {restaurantMeals.length > 0 ? (
          <section>
            <h2 className="font-bold text-s uppercase">Meals</h2>
            <p>{restaurantMeals.join(" ᐧ ")}</p>
          </section>
        ) : null}

        {restaurant.reviews && (
          <section>
            <h2 className="text-m font-bold uppercase mt-[10px]">Reviews</h2>

            <p className="flex justify-center items-center w-fit mt-[5px] text-xl font-bold">
              {typeof restaurant.reviews === "object" &&
              restaurant.reviews !== null ? (
                <>
                  {restaurant.reviews.average}{" "}
                  <StarIconFilled width="19" height="16" /> |{" "}
                  <small className=" text-m">{restaurant.reviews.total}</small>
                </>
              ) : (
                ""
              )}
            </p>
            <div className="flex flex-wrap gap-[15px]">
              {restaurant.reviews.googleReviewsUrl && (
                <a
                  href={restaurant.reviews.googleReviewsUrl}
                  className="flex justify-center items-center gap-[4px] border-b-[1px] border-black"
                >
                  Google reviews <ExternalLinkIcon />
                </a>
              )}

              {restaurant.reviews.tripadvisorReviewsUrl && (
                <a
                  href={restaurant.reviews.tripadvisorReviewsUrl}
                  className="flex justify-center items-center gap-[4px] border-b-[1px] border-black"
                >
                  Tripadvisor reviews <ExternalLinkIcon />
                </a>
              )}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
