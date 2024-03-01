export const revalidateTime = 10800;

export const metadataSiteName = "beeestrest.vercel.app";
export const metadataUrl = "https://beeestrest.vercel.app";
export const metadataImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Images/metadata/ogimage.webp`;

export const resultsPerPage = 10;

export enum LocalStorageKeys {
  LAST_VIEWED = "lastViewed",
}
