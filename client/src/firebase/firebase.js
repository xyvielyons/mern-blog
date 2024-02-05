// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyC51b9BRAWDTAXelN7ENnVPjZxfCX0CM7s",

  authDomain: "mern-blog-20d1d.firebaseapp.com",

  projectId: "mern-blog-20d1d",

  storageBucket: "mern-blog-20d1d.appspot.com",

  messagingSenderId: "1028085499599",

  appId: "1:1028085499599:web:354dcbdb7739aa0d5659ba"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);