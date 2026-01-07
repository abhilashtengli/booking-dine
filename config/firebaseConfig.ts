// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvlA2Qa-uR_0oe425gQp4VURxLPob5W_M",
  authDomain: "booking-dine.firebaseapp.com",
  projectId: "booking-dine",
  storageBucket: "booking-dine.firebasestorage.app",
  messagingSenderId: "699260133036",
  appId: "1:699260133036:web:abd0130800d2fd26cf0909",
  measurementId: "G-G7JF3WPXH1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
