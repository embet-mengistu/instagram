import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyApNKWhmqYiDpbHwOr2_7pBS7r_mbfn1K0",
  authDomain: "insta-86cee.firebaseapp.com",
  projectId: "insta-86cee",
  storageBucket: "insta-86cee.appspot.com",
  messagingSenderId: "576540268135",
  appId: "1:576540268135:web:fd34506e7ef50973eba6c2",
  measurementId: "G-KZRVV524KZ",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
