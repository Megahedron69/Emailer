import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { auth } = req.cookies;

    if (auth === "true") {
      return res.status(200).json({ authenticated: true });
    }

    return res.status(401).json({ authenticated: false });
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
