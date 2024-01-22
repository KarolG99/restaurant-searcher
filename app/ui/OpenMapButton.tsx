"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Languages } from "../types";
import { Routes } from "../config/routes";
import MapIcon from "../icons/MapIcon";

type OpenMapButtonProps = {
  locale: Languages;
};

const OpenMapButton = ({ locale }: OpenMapButtonProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  return (
    <Link
      href={`/${locale}${Routes.MAP}?${params.toString()}`}
      className="bg-black flex justify-center items-center text-background gap-[8px] px-[15px] py-[5px] rounded-full fixed bottom-[25px] left-[50%] translate-x-[-50%] z-10 border-[1px] border-background"
    >
      Open Map <MapIcon fill="#F5F5DC" />
    </Link>
  );
};

export default OpenMapButton;
