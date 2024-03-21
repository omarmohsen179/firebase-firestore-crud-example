import { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/firebase-admin";

type Data = {
  id?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { collectionName, docData } = req.body;
      const docRef = await db.collection(collectionName).add(docData);
      res.status(200).json({ id: docRef.id });
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
