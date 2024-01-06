import { Languages } from "../types";

import * as commonEN from "@/app/dictionaries/en/common";
import * as pagesEN from "@/app/dictionaries/en/pages";

import * as commonPL from "@/app/dictionaries/pl/common";
import * as pagesPL from "@/app/dictionaries/pl/pages";

export const getDictionary = (locale: Languages) => {
  if (locale === Languages.PL) {
    // const common = await import("../dictionaries/pl/common").then(
    //   (module) => module
    // );
    return { common: commonPL, pages: pagesPL };
  } else {
    // const common = await import("../dictionaries/en/common").then(
    //   (module) => module
    // );
    return { common: commonEN, pages: pagesEN };
  }
};
