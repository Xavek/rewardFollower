import { PublicationFragment } from "@lens-protocol/client";

export const filterData = (lensData: PublicationFragment[]) => {
  return lensData.filter((singleData) => singleData.__typename === "Post");
};
