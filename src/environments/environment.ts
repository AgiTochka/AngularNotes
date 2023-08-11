// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*
const firebaseConfig = {
  apiKey: "AIzaSyBLopZ5GXk03LCSldrcBVgQYe5wwvQe-tM",
  authDomain: "angular-notes-be170.firebaseapp.com",
  projectId: "angular-notes-be170",
  storageBucket: "angular-notes-be170.appspot.com",
  messagingSenderId: "403728683338",
  appId: "1:403728683338:web:e25626cea05276cf96b1b3",
  measurementId: "G-6725ETRL9W"
};
*/
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBLopZ5GXk03LCSldrcBVgQYe5wwvQe-tM",
    authDomain: "angular-notes-be170.firebaseapp.com",
    databaseURL: "https://angular-notes-be170-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "angular-notes-be170",
    storageBucket: "angular-notes-be170.appspot.com",
    messagingSenderId: "403728683338",
    appId: "1:403728683338:web:e25626cea05276cf96b1b3",
    measurementId: "G-6725ETRL9W"
  }
};
