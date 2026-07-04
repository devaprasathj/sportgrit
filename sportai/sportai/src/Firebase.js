import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDP18XH72yOLCRMM2s3NROOc8P5zWxiOow",
  authDomain: "sportgrit-fd21f.firebaseapp.com",
  projectId: "sportgrit-fd21f",
  storageBucket: "sportgrit-fd21f.firebasestorage.app",
  messagingSenderId: "626252950461",
  appId: "1:626252950461:web:3acadede27b364b4e0c0d4",
  measurementId: "G-172L5VP0BW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);