import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPpfim2uO2UjpXBT72L2hgZTEdLUXbXKw",
  authDomain: "narayani-boutique.firebaseapp.com",
  projectId: "narayani-boutique",
  storageBucket: "narayani-boutique.firebasestorage.app",
  messagingSenderId: "564245702374",
  appId: "1:564245702374:web:d282974d6cb4be141d7d27",
  measurementId: "G-8WQLXP8CRB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
