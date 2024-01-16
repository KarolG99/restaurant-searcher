import { icon } from "leaflet";

import { RestaurantReviews } from "@/database.types";
import MarkerImg from "@/public/marker.png";
import { Marker, Popup } from "react-leaflet";
import Image from "next/image";

type MapMarkerProps = {
  restaurant: {
    lat: number;
    long: number;
    name: string;
    reviews: RestaurantReviews;
    averagePriceSymbol: string;
    mainImage: string;
  };
};

const MapMarker = ({ restaurant }: MapMarkerProps) => {
  const { name, lat, long, reviews, averagePriceSymbol, mainImage } =
    restaurant;

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
      </Popup>
    </Marker>
  );
};

export default MapMarker;
