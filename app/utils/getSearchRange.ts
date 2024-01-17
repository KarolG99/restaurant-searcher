import { resultsPerPage } from "../config/base";

export const getSearchRange = (currentPage: number) => {
  const page = currentPage - 1;

  let from = page * resultsPerPage;
  const to = from + resultsPerPage - 1;

  return { from, to };
};
