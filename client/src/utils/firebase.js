
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "examnotes-b1e19.firebaseapp.com",
  projectId: "examnotes-b1e19",
  storageBucket: "examnotes-b1e19.firebasestorage.app",
  messagingSenderId: "18043401025",
  appId: "1:18043401025:web:a10e0bb04da7923ce2e7c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const provider = new GoogleAuthProvider()
export {auth , provider}