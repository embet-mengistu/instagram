import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCzDemirEfQXv1DKgB6yXghK7czI1ImVjI",
  authDomain: "insta2-4cb73.firebaseapp.com",
  projectId: "insta2-4cb73",
  storageBucket: "insta2-4cb73.appspot.com",
  messagingSenderId: "856200415097",
  appId: "1:856200415097:web:a4d1324a742b07561491a8",
  measurementId: "G-DX2Z8E1TEY",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
