// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDYtMPZz0hlkomZ6WGepv12ccl0DS4Ibeg",
    authDomain: "fry-day-bdeab.firebaseapp.com",
    projectId: "fry-day-bdeab",
    storageBucket: "fry-day-bdeab.appspot.com",
    messagingSenderId: "73963460214",
    appId: "1:73963460214:web:19d2b4976f389eceb8f157",
    measurementId: "G-VDJ6Z505PQ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };


