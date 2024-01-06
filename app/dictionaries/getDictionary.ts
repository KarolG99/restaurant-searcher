import { Languages } from "../types";

import * as commonEN from "@/app/dictionaries/en/common";

import * as commonPL from "@/app/dictionaries/pl/common";

export const getDictionary = (locale: Languages) => {
  if (locale === Languages.PL) {
    // const common = await import("../dictionaries/pl/common").then(
    //   (module) => module
    // );
    return { common: commonPL };
  } else {
    // const common = await import("../dictionaries/en/common").then(
    //   (module) => module
    // );
    return { common: commonEN };
  }
};
