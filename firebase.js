import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKQhjFS621D1p383r0aPSWJ9TZvyVxD2o",
  authDomain: "blogs-app-72efb.firebaseapp.com",
  projectId: "blogs-app-72efb",
  storageBucket: "blogs-app-72efb.firebasestorage.app",
  messagingSenderId: "440151561043",
  appId: "1:440151561043:web:1d6126821d76e39469c7a6",
  measurementId: "G-RDNKBV9LTK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
