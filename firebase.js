// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh80UXZS7zoEVhcxDkmgbCH0WIvAEPs4Y",
  authDomain: "form-filling-3269f.firebaseapp.com",
  projectId: "form-filling-3269f",
  storageBucket: "form-filling-3269f.firebasestorage.app",
  messagingSenderId: "837305468820",
  appId: "1:837305468820:web:2edf19866b8dbb563c3181",
  measurementId: "G-4RN3X9HKB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);