import { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/firebase-admin";

type Data = {
  documents?: Array<any>;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const { collectionName } = req.query;
      const snapshot = await db.collection(collectionName as string).get();

      let documents: Array<any> = [];
      snapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      res.status(200).json({ documents });
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
