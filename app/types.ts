export enum Languages {
  EN = "en",
  PL = "pl",
}

export type ParamsType = Readonly<{
  params: {
    locale: Languages;
  };
}>;
