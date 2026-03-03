import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TRUCO: Si la variable no existe (durante el build), usamos "mock_key" para que no dé error.
// Cuando la web esté publicada y tenga las claves reales, usará las reales.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "mock_key",
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || "mock_domain",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "mock_project",
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || "mock_bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || "12345",
  appId: process.env.NEXT_PUBLIC_APP_ID || "1:12345:web:12345"
};

// Inicializar la app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);