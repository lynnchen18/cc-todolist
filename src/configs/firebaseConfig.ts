// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKn-EGe_iSG1KeySZKHi5T08fowEyEK84",
  authDomain: "cc-todolist-d905e.firebaseapp.com",
  projectId: "cc-todolist-d905e",
  storageBucket: "cc-todolist-d905e.appspot.com",
  messagingSenderId: "982308224227",
  appId: "1:982308224227:web:f2107e713279821ac519d6",
  measurementId: "G-L1KNW0RRDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


