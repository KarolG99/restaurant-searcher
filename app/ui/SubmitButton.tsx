"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { SearchParams } from "../types";

type SubmitButtonProps = {
  stateSearchParams: {
    location: string;
    cuisine: string;
    diet: string;
    price: string;
    meal: string;
  };
};

const SubmitButton = ({ stateSearchParams }: SubmitButtonProps) => {
  const { location, cuisine, diet, price, meal } = stateSearchParams;

  const pathname = usePathname();
  const { replace } = useRouter();

  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  useEffect(() => {
    if (location.length > 0) {
      params.set(SearchParams.LOCATION, location);
    } else {
      params.delete(SearchParams.LOCATION);
    }
  }, [location, params]);

  useEffect(() => {
    if (cuisine.length > 0) {
      params.set(SearchParams.CUISINE, cuisine);
    } else {
      params.delete(SearchParams.CUISINE);
    }
  }, [cuisine, params]);

  useEffect(() => {
    if (diet.length > 0) {
      params.set(SearchParams.DIET, diet);
    } else {
      params.delete(SearchParams.DIET);
    }
  }, [diet, params]);

  useEffect(() => {
    if (price.length > 0) {
      params.set(SearchParams.PRICE, price);
    } else {
      params.delete(SearchParams.PRICE);
    }
  }, [price, params]);

  useEffect(() => {
    if (meal.length > 0) {
      params.set(SearchParams.MEAL, meal);
    } else {
      params.delete(SearchParams.MEAL);
    }
  }, [meal, params]);

  return (
    <button
      className=" bg-black m-auto text-background px-[30px] py-[7px] text-center rounded-[20px] mt-[15px]"
      onClick={() => replace(`${pathname}?${params.toString()}`)}
    >
      Search
    </button>
  );
};

export default SubmitButton;
