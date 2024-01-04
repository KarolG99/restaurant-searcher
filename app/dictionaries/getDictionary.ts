import { Languages } from "../types";

export const getDictionary = async (locale: Languages) => {
  if (locale === Languages.PL) {
    const common = import("../dictionaries/pl/common.json").then(
      (module) => module.default
    );
    return Promise.all([common]).then((modules) => {
      return { common: modules[0] };
    });
  } else {
    const common = import("../dictionaries/en/common.json").then(
      (module) => module.default
    );
    return Promise.all([common]).then((modules) => {
      return { common: modules[0] };
    });
  }
};
