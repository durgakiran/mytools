// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await axios.get(
    "http://webcache.googleusercontent.com/search?q=cache:https://wityan.medium.com/next-js-project-structure-1531610bed71"
  );

  const responseCode = response.status;

  return res.status(responseCode).send(response.data);
}
