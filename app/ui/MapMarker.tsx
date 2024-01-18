import { icon } from "leaflet";

import { RestaurantReviews } from "@/database.types";
import MarkerImg from "@/public/marker.png";
import { Marker, Popup } from "react-leaflet";
import Image from "next/image";
import Link from "next/link";
import { Languages } from "../types";
import { Routes } from "../config/routes";

type MapMarkerProps = {
  restaurant: {
    id: number;
    lat: number;
    long: number;
    name: string;
    reviews: RestaurantReviews;
    averagePriceSymbol: string;
    mainImage: string;
  };
  locale?: Languages;
};

const MapMarker = ({ restaurant, locale }: MapMarkerProps) => {
  const { id, name, lat, long, reviews, averagePriceSymbol, mainImage } =
    restaurant;

  const slug = name?.toLowerCase().replace(/\s+/g, "-");

  const customIcon = icon({
    iconUrl: MarkerImg.src,
    iconSize: [32, 34],
    iconAnchor: [14, 38],
    popupAnchor: [2, -35],
    tooltipAnchor: [16, -28],
  });

  return (
    <Marker position={[long, lat]} icon={customIcon}>
      <Popup>
        {locale ? (
          <Link
            href={`/${locale}${Routes.RESTAURANT}/${id}${slug && "-" + slug}`}
          >
            <div className="flex gap-[8px]">
              <div className="relative w-[60px] h-[60px]">
                <Image
                  src={mainImage}
                  alt={`${name} restaurant image`}
                  fill
                  className="rounded-md"
                />
              </div>
              <div>
                <h2 className=" line-clamp-2 font-bold mb-[4px]">{name}</h2>
                <span>
                  {reviews.average} | {averagePriceSymbol}
                </span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex gap-[8px]">
            <div className="relative w-[60px] h-[60px]">
              <Image
                src={mainImage}
                alt={`${name} restaurant image`}
                fill
                className="rounded-md"
              />
            </div>
            <div>
              <h2 className=" line-clamp-2 font-bold mb-[4px]">{name}</h2>
              <span>
                {reviews.average} | {averagePriceSymbol}
              </span>
            </div>
          </div>
        )}
      </Popup>
    </Marker>
  );
};

export default MapMarker;
