// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { addDoc, collection, getFirestore } from "firebase/firestore";

import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA_uZgafV5i7IPEth9cD3EIK43CpR8mDck",
  authDomain: "netflix-clone-f5127.firebaseapp.com",
  projectId: "netflix-clone-f5127",
  storageBucket: "netflix-clone-f5127.firebasestorage.app",
  messagingSenderId: "985915405551",
  appId: "1:985915405551:web:65f187ea1597d2c7c5d71a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email: email,
    });

    toast.success("Account created successfully!");
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    toast.success("Logged in successfully!");
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);

    toast.success("Logged out successfully!");
  } catch (error) {
    console.log(error);
    toast.error(error.code);
  }
};

export { auth, db, login, signup, logout };
