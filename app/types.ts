export enum Languages {
  EN = "en",
  PL = "pl",
}

export type ParamsType = Readonly<{
  params: {
    locale: Languages;
  };
}>;

export type SearchParamsType = {
  location?: string;
  cuisine?: string;
  diet?: string;
  price?: string;
  meal?: string;
  page?: string;
};

export enum SearchParams {
  LOCATION = "location",
  CUISINE = "cuisine",
  DIET = "diet",
  PRICE = "price",
  MEAL = "meal",
}
