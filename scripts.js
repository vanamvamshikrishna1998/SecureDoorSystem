import { auth } from './firebase-init.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

console.log("Scripts loaded");

function showRegister() {
  console.log("Showing register form");
  document.getElementById('login-container').classList.remove('active');
  document.getElementById('register-container').classList.add('active');
}

function showLogin() {
  console.log("Showing login form");
  document.getElementById('login-container').classList.add('active');
  document.getElementById('register-container').classList.remove('active');
}

function register() {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  console.log("Registering user", email);

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('User Registered');
      showLogin();
    })
    .catch(error => {
      console.error("Registration error:", error);
      alert(error.message);
    });
}

function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  console.log("Logging in user", email);

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('User Logged In');
      window.location.href = 'doors.html';
    })
    .catch(error => {
      console.error("Login error:", error);
      alert(error.message);
    });
}

onAuthStateChanged(auth, user => {
  if (user) {
    console.log("User is logged in", user);
    window.location.href = 'doors.html';
  } else {
    console.log("No user is logged in");
    showLogin();
  }
});

document.getElementById('login-button').onclick = login;
document.getElementById('register-button').onclick = register;
document.getElementById('show-register').onclick = showRegister;
document.getElementById('show-login').onclick = showLogin;

// Initialize the login form as active
document.addEventListener('DOMContentLoaded', (event) => {
  console.log("Document loaded");
  showLogin();
});
