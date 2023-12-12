// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEWR7885piWlYNvPCkHvrcrhMgJV2Fzos",
  authDomain: "streamfind-9b86a.firebaseapp.com",
  projectId: "streamfind-9b86a",
  storageBucket: "streamfind-9b86a.appspot.com",
  messagingSenderId: "972937595026",
  appId: "1:972937595026:web:805cb3254ee47abee3fe4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export {auth,db};







