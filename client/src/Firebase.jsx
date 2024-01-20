// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDr8xo6x0GiyA3nBtfL4l_PoaD3_JoHIkU",
  authDomain: "atg-internship-dad6e.firebaseapp.com",
  projectId: "atg-internship-dad6e",
  storageBucket: "atg-internship-dad6e.appspot.com",
  messagingSenderId: "23386742457",
  appId: "1:23386742457:web:8ad4f7c01c5f71da4b0568",
  measurementId: "G-VYF2LJ7MM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)