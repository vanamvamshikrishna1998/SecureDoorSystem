import { auth, database } from './firebase-init.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { ref, set, get, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

console.log("Door Scripts loaded");

function logout() {
  console.log("Logging out");

  signOut(auth).then(() => {
    alert('User Logged Out');
    window.location.href = 'index.html';
  }).catch(error => {
    console.error("Logout error:", error);
    alert(error.message);
  });
}

function loadDoors() {
  const user = auth.currentUser;

  if (user) {
    const userRef = ref(database, 'users/' + user.email.replace('.', '_'));

    get(userRef).then(snapshot => {
      if (snapshot.exists()) {
        const doors = snapshot.val();
        const doorList = document.getElementById('door-list');
        doorList.innerHTML = '';

        for (let door in doors) {
          if (typeof doors[door] === 'boolean') {
            const li = document.createElement('li');
            li.innerHTML = `
              <span class="door-number">${door}</span>
              <div class="button-group">
                <button onclick="scanQRCode('${door}')" class="scan-button"><i class="fas fa-qrcode"></i> Scan QR Code</button>
                <button onclick="deleteDoor('${door}')" class="delete-button"><i class="fas fa-trash-alt"></i> Delete Door</button>
              </div>
            `;
            doorList.appendChild(li);
          }
        }
      } else {
        console.log("No doors found");
      }
    }).catch(error => {
      console.error("Error loading doors:", error);
    });
  }
}

function showSuccessMessage() {
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.innerHTML = `
    <div class="success-content">
      <i class="fas fa-check-circle"></i>
      <p>Success!</p>
    </div>
  `;
  document.body.appendChild(successMessage);

  setTimeout(() => {
    successMessage.remove();
  }, 2000);
}

async function scanQRCode(door) {
  console.log("Scanning QR Code for door", door);

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    const video = document.getElementById('preview');
    video.srcObject = stream;
    video.play();

    const qrScanner = new QrScanner(video, result => {
      console.log("QR Code scanned", result);
      if (result === door) {
        const user = auth.currentUser;
        if (user) {
          const doorRef = ref(database, 'users/' + user.email.replace('.', '_') + '/' + door);
          set(doorRef, true)
            .then(() => {
              showSuccessMessage();
              loadDoors();
              stream.getTracks().forEach(track => track.stop());
              qrScanner.stop();

              // Set the door value to false after 10 seconds
              setTimeout(() => {
                set(doorRef, false).then(() => {
                  loadDoors();
                }).catch(error => {
                  console.error("Error reverting door status:", error);
                  alert(error.message);
                });
              }, 10000);
            })
            .catch(error => {
              console.error("QR Code scan error:", error);
              alert(error.message);
            });
        } else {
          alert('No user logged in');
        }
      } else {
        alert('QR Code does not match the door number');
        stream.getTracks().forEach(track => track.stop());
        qrScanner.stop();
      }
    });
    qrScanner.start();
  } catch (error) {
    console.error("Error accessing the camera", error);
    alert('Error accessing the camera: ' + error.message);
  }
}

function deleteDoor(door) {
  const user = auth.currentUser;
  if (user) {
    const doorRef = ref(database, 'users/' + user.email.replace('.', '_') + '/' + door);
    remove(doorRef)
      .then(() => {
        alert('Door Deleted');
        loadDoors();
      })
      .catch(error => {
        console.error("Delete door error:", error);
        alert(error.message);
      });
  }
}

window.deleteDoor = deleteDoor;  // Make deleteDoor globally accessible
window.scanQRCode = scanQRCode;  // Make scanQRCode globally accessible

onAuthStateChanged(auth, user => {
  if (user) {
    console.log("User is logged in", user);
    loadDoors();
  } else {
    console.log("No user is logged in");
    window.location.href = 'index.html';
  }
});

document.getElementById('logout-button').onclick = logout;
document.getElementById('register-new-door-button').onclick = () => {
  window.location.href = 'register-door.html';
};

// Initialize the door list as active
document.addEventListener('DOMContentLoaded', (event) => {
  console.log("Document loaded");
  loadDoors();
});
