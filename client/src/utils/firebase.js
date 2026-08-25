
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "examnotes-b1e19.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "examnotes-b1e19",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "examnotes-b1e19.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "18043401025",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:18043401025:web:a10e0bb04da7923ce2e7c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const provider = new GoogleAuthProvider()
export {auth , provider}