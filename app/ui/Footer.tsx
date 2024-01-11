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

      <div>
        <h6 className=" text-m font-bold uppercase mb-[4px]">Links</h6>

        <ul className="text-m font-extralight underline">
          <li>
            <Link href={`/${locale}`}>Home</Link>
          </li>
          <li>
            <Link href={`/${locale}${Routes.SEARCH}?location=1`}>
              Restaurants in Kraków
            </Link>
          </li>
          <li>
            <Link href={`/${locale}${Routes.SEARCH}?location=2`}>
              Restaurants in Zakopane
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h6 className=" text-m font-bold uppercase mb-[4px]">Contact</h6>

        <ul className="text-m font-extralight underline">
          <li>
            <a href="mailto:karolgucwav2@gmail.com">Ask for website</a>
          </li>
          <li>
            <a href="mailto:admin@karolgucwa.pl">Report error</a>
          </li>
          <li>
            <a href="mailto:admin@karolgucwa.pl">Ask for feature</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
