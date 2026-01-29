import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhDuBGnEGwQseGSSEFTOTrdcFPGQGwrcM",
  authDomain: "kmclu-csit-portal.firebaseapp.com",
  databaseURL: "https://kmclu-csit-portal-default-rtdb.firebaseio.com",
  projectId: "kmclu-csit-portal",
  storageBucket: "kmclu-csit-portal.firebasestorage.app",
  messagingSenderId: "1045148098933",
  appId: "1:1045148098933:web:9075ad4790c9f9d826f33c",
  measurementId: "G-92ZRSHBFH8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
