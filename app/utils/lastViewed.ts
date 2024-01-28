import { LocalStorageKeys } from "../config/base";
import supabase from "../services/supabase";

export const saveLastViewed = (productId: number) => {
  const lastViewed: number[] = JSON.parse(
    localStorage.getItem(LocalStorageKeys.LAST_VIEWED) ?? "[]"
  );
  const existingIndex = lastViewed.indexOf(productId);
  if (existingIndex !== -1) {
    lastViewed.splice(existingIndex, 1);
  }

  lastViewed.unshift(productId);
  if (lastViewed.length >= 10) {
    lastViewed.pop();
  }
  localStorage.setItem(
    LocalStorageKeys.LAST_VIEWED,
    JSON.stringify(lastViewed)
  );
};

export const getLastViewed = async () => {
  const lastViewed: number[] = JSON.parse(
    localStorage.getItem(LocalStorageKeys.LAST_VIEWED) ?? "[]"
  );

  if (lastViewed.length > 0) {
    const { data } = await supabase
      .from("restaurants")
      .select("*")
      .in("id", lastViewed);

    return data;
  }
  return null;
};
