// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVN2bH0t-d0NqsJPpJbU1XChsfUJ3ozMk",
  authDomain: "assignment-11-94573.firebaseapp.com",
  projectId: "assignment-11-94573",
  storageBucket: "assignment-11-94573.firebasestorage.app",
  messagingSenderId: "1033623733571",
  appId: "1:1033623733571:web:7861447d928d48cc161bf6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);