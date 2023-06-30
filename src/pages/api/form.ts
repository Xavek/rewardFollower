import { filterData } from "@/lib/helper";
import { getSingleUser, getUserAllPublication } from "@/lib/lensMethods";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const lensUser = await getSingleUser(req.body.lensHandle);
  const userPublication = await getUserAllPublication(lensUser[0].id);
  res
    .status(200)
    .json({ profile: lensUser, publications: filterData(userPublication) });
}
