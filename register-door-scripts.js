import { auth, database } from './firebase-init.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

console.log("Register Door Scripts loaded");

function registerDoor() {
  const user = auth.currentUser;
  const doorSerial = document.getElementById('door-serial').value;

  console.log("Registering door", doorSerial);

  if (user) {
    const userRef = ref(database, 'users/' + user.email.replace('.', '_') + '/' + doorSerial);
    set(userRef, false)
      .then(() => {
        alert('Door Registered');
        window.location.href = 'doors.html';
      })
      .catch(error => {
        console.error("Register door error:", error);
        alert(error.message);
      });
  } else {
    alert('No user logged in');
  }
}

function goBack() {
  window.location.href = 'doors.html';
}

document.getElementById('register-door-button').onclick = registerDoor;
document.getElementById('back-button').onclick = goBack;

// Initialize the registration form as active
document.addEventListener('DOMContentLoaded', (event) => {
  console.log("Document loaded");
});
