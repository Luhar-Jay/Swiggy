// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCxBM6Kcz0g23lJMp4TBdQvTVQD5x8urI",
  authDomain: "swiggy-bae90.firebaseapp.com",
  projectId: "swiggy-bae90",
  storageBucket: "swiggy-bae90.appspot.com",
  messagingSenderId: "259310876150",
  appId: "1:259310876150:web:57e9b024ae0e4b1b13c3d7",
  measurementId: "G-CRS1HBPT8B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
