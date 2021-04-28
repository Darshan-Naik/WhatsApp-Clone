import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDStApBuIxGS8s4pFRsoH1KE6UnVTjFOQY",
    authDomain: "whatsup-62c5b.firebaseapp.com",
    projectId: "whatsup-62c5b",
    storageBucket: "whatsup-62c5b.appspot.com",
    messagingSenderId: "700026683522",
    appId: "1:700026683522:web:83d1cb6b781c89516ab49b",
    measurementId: "G-TXERFTFNR6"
  };

 const app = firebase.initializeApp(firebaseConfig);

 const provider = new firebase.auth.GoogleAuthProvider();

 var database = firebase.firestore();
 
 export {provider,database}
 export default app