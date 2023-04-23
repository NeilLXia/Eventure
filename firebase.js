// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB17zHb8CBrtxb8r_ydF_sMvjr34xqwaVE",
  authDomain: "tabisho.firebaseapp.com",
  projectId: "tabisho",
  storageBucket: "tabisho.appspot.com",
  messagingSenderId: "704726588529",
  appId: "1:704726588529:web:f4d507d36688e71d74cfd0",
  measurementId: "G-CL4YH7P40B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
