// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF5C7Ux2cNFa3XsmUVqRBSgtBQuYhlxfw",
  authDomain: "career-builder-cf444.firebaseapp.com",
  projectId: "career-builder-cf444",
  storageBucket: "career-builder-cf444.appspot.com",
  messagingSenderId: "760370269709",
  appId: "1:760370269709:web:8fc7e2a71fd6d7eaabcf44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 export const auth = getAuth(app);