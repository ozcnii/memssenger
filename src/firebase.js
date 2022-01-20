// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAtz3-Jp3MsxNLBujPPCLcwUJm6YpPyGQg",
    authDomain: "memssenger-c0d86.firebaseapp.com",
    projectId: "memssenger-c0d86",
    storageBucket: "memssenger-c0d86.appspot.com",
    messagingSenderId: "271283967966",
    appId: "1:271283967966:web:0b4e1a68a6aa42d5ebef4f",
    measurementId: "G-YLB9Z3H722",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
