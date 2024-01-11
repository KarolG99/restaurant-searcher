"use client";

import Link from "next/link";
import ArrowLeft from "../icons/ArrowLeft";

type BackButtonProps = {
  href?: string;
  text: string;
  goBack?: boolean;
};

const BackButton = ({ href, text, goBack }: BackButtonProps) => {
  const isHistory = window.history.length > 1;

  return goBack ? (
    <button
      onClick={() => {
        if (isHistory) {
          window.history.back();
        } else {
          window.location.href = "/";
        }
      }}
      className="flex items-center gap-[8px] font-medium mb-[20px]"
    >
      <ArrowLeft />
      {isHistory ? text : "Home"}
    </button>
  ) : (
    <Link
      href={href ?? "/"}
      className="flex items-center gap-[8px] font-medium mb-[20px]"
    >
      <ArrowLeft />
      {text}
    </Link>
  );
};

export default BackButton;
