"use client";

import {
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
} from "@nextui-org/pagination";
import AngleRight from "../icons/AngleRight";
import clsx from "clsx";
import AngleLeft from "../icons/AngleLeft";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const PaginationComponent = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const currentPage = Number(searchParams.get("page")) || 1;

  return (
    <div className="flex justify-center items-center mt-[20px]">
      <Pagination
        disableCursorAnimation
        showControls
        total={totalPages}
        initialPage={currentPage}
        className="gap-2"
        renderItem={(props) =>
          PaginationItem({ ...props, currentPage, params, pathname })
        }
        variant="light"
        siblings={window.innerWidth <= 500 ? 0 : 1}
      />
    </div>
  );
};

export default PaginationComponent;

const PaginationItem = ({
  ref,
  key,
  value,
  isActive,
  onNext,
  onPrevious,
  setPage,
  className,
  currentPage,
  total,
  params,
  pathname,
}: PaginationItemRenderProps & {
  currentPage: number;
  params: any;
  pathname: string;
}) => {
  const createPageURL = () => {
    if (value === PaginationItemType.NEXT) {
      params.set("page", (currentPage + 1).toString());
      return `${pathname}?${params.toString()}`;
    } else if (value === PaginationItemType.PREV) {
      params.set("page", (currentPage - 1).toString());
      return `${pathname}?${params.toString()}`;
    } else {
      params.set("page", value.toString());
      return `${pathname}?${params.toString()}`;
    }
  };

  if (value === PaginationItemType.NEXT) {
    return currentPage < total ? (
      <Link
        href={createPageURL()}
        key={key}
        className={clsx(className, "min-w-8 w-8 h-8")}
        onClick={onNext}
      >
        <AngleRight />
      </Link>
    ) : null;
  }

  if (value === PaginationItemType.PREV) {
    return currentPage - 1 !== 0 ? (
      <Link
        href={createPageURL()}
        key={key}
        className={clsx(className, "bg-default-200/50 min-w-8 w-8 h-8")}
        onClick={onPrevious}
      >
        <AngleLeft />
      </Link>
    ) : null;
  }

  if (value === PaginationItemType.DOTS) {
    return (
      <button
        key={key}
        className={clsx(className, "w-[35px] h-[35px] rounded-md")}
      >
        ...
      </button>
    );
  }

  // cursor is the default item
  return (
    <Link
      href={createPageURL()}
      key={key}
      ref={ref}
      className={clsx(
        className,
        isActive && "text-white bg-black font-bold",
        "w-[35px] h-[35px] rounded-md"
      )}
      onClick={() => setPage(value)}
    >
      {value}
    </Link>
  );
};
