// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD8fbjRgT8rQqmoQS8uvESLWLYGtWT40xE",
  authDomain: "doorsecuritysystem-90415.firebaseapp.com",
  projectId: "doorsecuritysystem-90415",
  storageBucket: "doorsecuritysystem-90415.appspot.com",
  messagingSenderId: "648421874619",
  appId: "1:648421874619:web:af7f06b32c431a96bac29e",
  measurementId: "G-XXELX743XC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
