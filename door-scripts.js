import { auth, database } from './firebase-init.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { ref, set, get, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import QrScanner from './qr-scanner.min.js'; // Ensure the path is correct

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
            li.innerHTML = `<span class="door-number">${door}</span>
                            <div class="button-group">
                              <button onclick="scanQRCode('${door}')" class="scan-button"><i class="fas fa-qrcode"></i> Scan QR Code</button>
                              <button onclick="deleteDoor('${door}')" class="delete-button"><i class="fas fa-trash-alt"></i> Delete Door</button>
                            </div>`;
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

function scanQRCode(doorCode) {
  const videoElement = document.getElementById('qr-video');
  videoElement.style.width = '300px'; // Set the size for better user experience
  videoElement.style.display = 'block'; // Ensure the video element is visible

  const qrScanner = new QrScanner(videoElement, result => {
    console.log('Decoded QR code:', result.data); // Logging the actual data scanned
    if (result.data === doorCode) {
      console.log('QR Code matches the door code.');
      showSuccessMessage();
      updateDoorStatus(doorCode, true);
      setTimeout(() => {
        updateDoorStatus(doorCode, false); // Reset the door status after 10 seconds
      }, 10000);
      qrScanner.stop(); // Stop scanning after a successful match
      videoElement.style.display = 'none'; // Hide the video element after scanning
    } else {
      console.log(`Mismatch: QR Code (${result.data}) does not match Door Code (${doorCode})`);
      showErrorMessage();
      // Do not stop scanning after a mismatch, let user try again
    }
  }, {
    onDecodeError: error => {
      console.error('Decode error:', error);
      // Optionally handle decode errors, e.g., show a different message
    },
    highlightScanRegion: true,
    highlightCodeOutline: true,
  });

  qrScanner.start().catch(err => {
    console.error('Error starting QR Scanner:', err);
    alert('Error starting QR Scanner: ' + err);
    videoElement.style.display = 'none'; // Hide the video element if scanner fails to start
  });

  // Optional: Provide a way to stop the scanner manually, e.g., a button
  document.getElementById('stop-scanner').addEventListener('click', () => {
    qrScanner.stop();
    videoElement.style.display = 'none';
  });
}





function updateDoorStatus(doorCode, status) {
  const user = auth.currentUser;
  if (user) {
    const doorRef = ref(database, 'users/' + user.email.replace('.', '_') + '/' + doorCode);
    set(doorRef, status).then(() => {
      console.log(`Door status updated to ${status}`);
    }).catch(error => {
      console.error("Firebase set error:", error);
      alert("Error updating door status in Firebase: " + error.message);
    });
  }
}




function checkQrCode(decodedText, doorCode, qrScanner, videoElement) {
  console.log(`Checking decoded text: ${decodedText} against door code: ${doorCode}`);
  if (decodedText === doorCode) {
    showSuccessMessage();
    const user = auth.currentUser;
    const doorRef = ref(database, 'users/' + user.email.replace('.', '_') + '/' + doorCode);
    set(doorRef, true).then(() => {
      setTimeout(() => {
        set(doorRef, false); // Reset the door status after 10 seconds
      }, 10000);
      qrScanner.stop(); // Stop scanning when done
      videoElement.style.display = 'none'; // Hide video element
    }).catch(error => {
      console.error("Firebase set error:", error);
    });
  } else {
    showErrorMessage();
    setTimeout(() => {
      qrScanner.stop(); // Stop scanning when done
      videoElement.style.display = 'none'; // Hide video element
    }, 10000);
  }
}

function showSuccessMessage() {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message-overlay';
  messageDiv.innerHTML = `
    <div class="message-content success-icon">
      <i class="fas fa-check-circle"></i>
      <p>Success!</p>
    </div>
  `;
  document.body.appendChild(messageDiv);
  setTimeout(() => {
    messageDiv.style.opacity = 1;
    setTimeout(() => {
      messageDiv.remove();
    }, 3000); // Adjust timing to match animation duration
  }, 10);
}

function showErrorMessage() {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message-overlay';
  messageDiv.innerHTML = `
    <div class="message-content error-icon">
      <i class="fas fa-times-circle"></i>
      <p>Failed!</p>
    </div>
  `;
  document.body.appendChild(messageDiv);
  setTimeout(() => {
    messageDiv.style.opacity = 1;
    setTimeout(() => {
      messageDiv.remove();
    }, 3000); // Adjust timing to match animation duration
  }, 10);
}


function deleteDoor(door) {
  const user = auth.currentUser;
  if (user) {
    const doorRef = ref(database, 'users/' + user.email.replace('.', '_') + '/' + door);
    remove(doorRef).then(() => {
      alert('Door Deleted');
      loadDoors();
    }).catch(error => {
      console.error("Delete door error:", error);
      alert(error.message);
    });
  }
}

window.deleteDoor = deleteDoor;
window.scanQRCode = scanQRCode;

onAuthStateChanged(auth, user => {
  if (user) {
    console.log("User is logged in", user);
    loadDoors();
  } else {
    console.log("No user is logged in");
    window.location.href = 'index.html';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  console.log("Document loaded");
  loadDoors();
});
