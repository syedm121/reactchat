import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1PX2TXkGYTbmtxnMwBkeKmGBqP6yFd9E",
  authDomain: "chatapp-76b99.firebaseapp.com",
  projectId: "chatapp-76b99",
  storageBucket: "chatapp-76b99.firebasestorage.app",
  messagingSenderId: "703226919546",
  appId: "1:703226919546:web:15eed7ce4872629d1419c3",
  measurementId: "G-6FS77V2MCM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()