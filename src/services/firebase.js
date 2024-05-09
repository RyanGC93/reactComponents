const firebaseApiKey = `${process.env.REACT_APP_FIREBASE_API_KEY}`;
const firebaseAppId = `${process.env.REACT_APP_FIREBASE_APP_ID}`;
const firebaseAuthDomain = `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`;
const firebaseMeasurementId = `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`;
const firebaseMessagingSenderId = `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`;
const firebaseProjectId = `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`;
const firebaseStorageBucket = `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
  measurementId: firebaseMeasurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
