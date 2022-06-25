// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSrqVtCW1Bp16vub85xJqoCItCv92QjTo",
    authDomain: "m-todo-32563.firebaseapp.com",
    projectId: "m-todo-32563",
    storageBucket: "m-todo-32563.appspot.com",
    messagingSenderId: "611452630409",
    appId: "1:611452630409:web:0d969d48d09a61388cdd58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
