export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyDNIRSF7e7b8K9--DXKmmYb0fWjeqmtY4g",
    authDomain: "sentiment-data-baae2.firebaseapp.com",
    projectId: "sentiment-data-baae2",
    storageBucket: "sentiment-data-baae2.appspot.com",
    messagingSenderId: "800415064617",
    appId: "1:800415064617:web:0b8fbc45c5838443753238"
  },

  
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNIRSF7e7b8K9--DXKmmYb0fWjeqmtY4g",
  authDomain: "sentiment-data-baae2.firebaseapp.com",
  projectId: "sentiment-data-baae2",
  storageBucket: "sentiment-data-baae2.appspot.com",
  messagingSenderId: "800415064617",
  appId: "1:800415064617:web:0b8fbc45c5838443753238"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);