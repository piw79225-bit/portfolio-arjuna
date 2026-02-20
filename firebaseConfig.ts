import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcak4qjRu_4_BtOrHlPtuhf0dRSKKlwZ4",
  authDomain: "arjuna-portofolio.firebaseapp.com",
  projectId: "arjuna-portofolio",
  storageBucket: "arjuna-portofolio.firebasestorage.app",
  messagingSenderId: "639656082080",
  appId: "1:639656082080:web:7a6404f729267d662ae7c5"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
