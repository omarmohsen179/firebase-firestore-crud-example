// utils/firebase-admin.js
import admin from "firebase-admin";

const serviceAccount = require("");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export default db;
