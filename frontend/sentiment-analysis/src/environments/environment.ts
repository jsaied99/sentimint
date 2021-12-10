// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

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
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
