import { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/firebase-admin";

type Data = {
  id?: string;
  data?: FirebaseFirestore.DocumentData;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const { collectionName, docId } = req.query;
      const doc = await db
        .collection(collectionName as string)
        .doc(docId as string)
        .get();
      if (!doc.exists) {
        return res.status(404).json({ error: "Document not found" });
      }
      res.status(200).json({ id: doc.id, data: doc.data() });
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
