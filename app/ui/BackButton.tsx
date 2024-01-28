"use client";

import Link from "next/link";
import ArrowLeft from "../icons/ArrowLeft";

type BackButtonProps = {
  href?: string;
  text: string;
  goBack?: boolean;
  locale?: string;
};

const BackButton = ({ href, text, goBack, locale }: BackButtonProps) => {
  return goBack ? (
    <button
      onClick={() => {
        if (typeof window !== "undefined") {
          if (window.history.length <= 1) {
            window.location.href = `/${locale}`;
          } else {
            window.history.back();
          }
        }
      }}
      className="flex items-center gap-[8px] font-medium mb-[20px]"
    >
      <ArrowLeft />
      {text}
    </button>
  ) : (
    <Link
      href={href ?? `/${locale}`}
      className="flex items-center gap-[8px] font-medium mb-[20px]"
    >
      <ArrowLeft />
      {text}
    </Link>
  );
};

export default BackButton;
