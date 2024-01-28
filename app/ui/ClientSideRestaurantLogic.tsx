"use client";

import { useEffect } from "react";
import { saveLastViewed } from "../utils/lastViewed";

type ClientSideRestaurantLogicProps = {
  productId: number;
};

const ClientSideRestaurantLogic = ({
  productId,
}: ClientSideRestaurantLogicProps) => {
  useEffect(() => {
    if (productId) {
      saveLastViewed(productId);
    }
  }, [productId]);

  return null;
};

export default ClientSideRestaurantLogic;
