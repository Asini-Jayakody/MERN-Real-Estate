// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-29c84.firebaseapp.com",
  projectId: "mern-real-estate-29c84",
  storageBucket: "mern-real-estate-29c84.firebasestorage.app",
  messagingSenderId: "786044982987",
  appId: "1:786044982987:web:0f9874d7126650b49fad4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;