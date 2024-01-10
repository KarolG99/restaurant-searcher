"use client";

import Link from "next/link";
import ArrowLeft from "../icons/ArrowLeft";
import { useRouter } from "next/router";

type BackButtonProps = {
  href?: string;
  text: string;
  goBack?: boolean;
};

const BackButton = ({ href, text, goBack }: BackButtonProps) => {
  return goBack ? (
    <button
      onClick={() => window.history.back()}
      className="flex items-center gap-[8px] font-medium mb-[20px]"
    >
      <ArrowLeft />
      {text}
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
