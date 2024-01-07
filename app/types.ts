export enum Languages {
  EN = "en",
  PL = "pl",
}

export type ParamsType = Readonly<{
  params: {
    locale: Languages;
  };
}>;

export enum SearchParams {
  LOCATION = "location",
  CUISINE = "cuisine",
  DIET = "diet",
  PRICE = "price",
  MEAL = "meal",
}
