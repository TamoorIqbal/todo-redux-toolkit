import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4KjXWaFC-uFZEwH9A14hZKHubEDmgyWM",
  authDomain: "reduxtodo-a78b1.firebaseapp.com",
  projectId: "reduxtodo-a78b1",
  storageBucket: "reduxtodo-a78b1.appspot.com",
  messagingSenderId: "629401685819",
  appId: "1:629401685819:web:8e6dbe3464b673ba66f11e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
