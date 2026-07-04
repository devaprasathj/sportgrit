import admin from "firebase-admin";
import fs from "fs";

let firebaseApp = null;

export function initializeFirebase() {
  if (firebaseApp) {
    return firebaseApp;
  }

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (!serviceAccountPath) {
    console.warn("FIREBASE_SERVICE_ACCOUNT_PATH not set. Firebase not initialized.");
    return null;
  }

  try {
    const data = fs.readFileSync(serviceAccountPath, "utf8");
    const serviceAccount = JSON.parse(data);

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("Firebase Admin initialized successfully.");
    return firebaseApp;
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error.message);
    return null;
  }
}

export function getFirestore() {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return firebaseApp ? admin.firestore() : null;
}

export function getAuth() {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return firebaseApp ? admin.auth() : null;
}
