import { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/firebase-admin";

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "DELETE") {
    try {
      const { collectionName, docId } = req.query;
      await db
        .collection(collectionName as string)
        .doc(docId as string)
        .delete();
      res.status(200).json({ message: "Document successfully deleted" });
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
