import React from "react";
import Link from "next/link";

import Logo from "./Logo";

import { Languages } from "../types";

import { Routes } from "../config/routes";

type FooterProps = {
  locale: Languages;
};

const Footer = ({ locale }: FooterProps) => {
  return (
    <footer className="bg-black text-background w-full max-w-[1280px] px-[15px] py-[30px] mt-[70px] gap-[40px] flex flex-col items-start sm:flex-row md:gap-[80px]">
      <Logo size="l" />

      <ul className="text-m">
        <li>
          <Link href={`/${locale}`}>Home</Link>
        </li>
        <li>
          <Link href={`/${locale}${Routes.SEARCH}`}>Restaurants in Kraków</Link>
        </li>
        <li>
          <Link href={`/${locale}${Routes.SEARCH}`}>
            Restaurants in Zakopane
          </Link>
        </li>
      </ul>

      <ul className="text-m">
        <li>
          <Link href={`/${locale}`}>Home</Link>
        </li>
        <li>
          <Link href={`/${locale}${Routes.SEARCH}`}>Restaurants in Kraków</Link>
        </li>
        <li>
          <Link href={`/${locale}${Routes.SEARCH}`}>
            Restaurants in Zakopane
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
