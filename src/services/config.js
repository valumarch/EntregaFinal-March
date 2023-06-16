import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "seda-tejidos.firebaseapp.com",
  projectId: "seda-tejidos",
  storageBucket: "seda-tejidos.appspot.com",
  messagingSenderId: "789206658331",
  appId: "1:789206658331:web:7a4a6b37bf7fb15d57f7be"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);