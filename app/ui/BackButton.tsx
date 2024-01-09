"use client";

import Link from "next/link";
import ArrowLeft from "../icons/ArrowLeft";

type BackButtonProps = {
  href: string;
  text: string;
};

const BackButton = ({ href, text }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-[8px] font-medium mb-[20px]"
    >
      <ArrowLeft />
      {text}
    </Link>
  );
};

export default BackButton;
