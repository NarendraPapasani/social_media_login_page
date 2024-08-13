import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyA4fbrj11SC4qyvCVEozYvpZVDWUFWP8ds",
  authDomain: "react-blog-b5875.firebaseapp.com",
  projectId: "react-blog-b5875",
  storageBucket: "react-blog-b5875.appspot.com",
  messagingSenderId: "55248785818",
  appId: "1:55248785818:web:7f34a0741a3bb2833d2a23",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
