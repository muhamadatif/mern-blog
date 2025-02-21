// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-9a243.firebaseapp.com",
  projectId: "mern-blog-9a243",
  storageBucket: "mern-blog-9a243.firebasestorage.app",
  messagingSenderId: "871183645804",
  appId: "1:871183645804:web:47b4d4271bbebf8317ec49",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
