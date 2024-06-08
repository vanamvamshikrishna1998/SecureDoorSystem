
# Secure Door System

## Overview
The Secure Door System is a robust and innovative security solution designed for modern access control. Utilizing an ESP32 microcontroller, this system integrates with Firebase for efficient real-time data handling, offering a secure and user-friendly interface for managing access permissions. This system is ideal for enhancing the security of both residential and commercial properties.

## Key Features

- **Real-time Access Control**: Monitors and manages door access in real-time.
- **QR Code-based Entry**: Facilitates entry through secure, personalized QR codes for each registered user.
- **Firebase Backend**: Leverages Firebase for robust backend operations including user management, authentication, and access logging.
- **Remote Management Interface**: Enables remote administration through a user-friendly web interface, allowing administrators to manage users and view access logs from anywhere.

## Technology Stack

- **ESP32**: Core controller for managing the door lock mechanisms and QR code scanning.
- **Firebase**: Handles database management, user authentication, and backend logic.
- **HTML/CSS/JavaScript**: Implements the administrative front-end for user and access management.
- **Arduino**: Utilized for programming the ESP32 with necessary functionalities.

## Project Structure

```
/SecureDoorSystem
│
├── /src                # Source code for the ESP32
├── /web                # Web interface files
├── /docs               # Documentation and setup guides
└── /hardware           # Hardware schematics and PCB designs
```

## Getting Started

### Prerequisites

- ESP32 development board
- Electronic lock mechanism compatible with ESP32
- QR code scanner compatible with ESP32
- Basic electronic components such as wires, resistors, and a breadboard
- Firebase account

### Hardware Setup

1. Assemble the circuit as per the schematics in the `/hardware` directory.
2. Connect the electronic door lock to the ESP32 module.
3. Setup the QR code scanner module with the ESP32.

### Software Setup

1. **Clone the Repository**
   ```
   git clone https://github.com/vanamvamshikrishna1998/SecureDoorSystem.git
   cd SecureDoorSystem
   ```

2. **Firebase Configuration**
   - Create a new Firebase project in the Firebase console.
   - Enable the Firestore Database and Authentication modules.
   - Download the Firebase configuration file and integrate it into the project settings.

3. **ESP32 Configuration**
   - Install the ESP32 board definitions in the Arduino IDE or preferred development environment.
   - Load the source code from `/src`.
   - Update the Wi-Fi and Firebase credentials in the configuration files.
   - Upload the firmware to the ESP32.

4. **Web Interface Setup**
   - Navigate to the `/web` directory.
   - Update the Firebase configuration within the HTML files to connect to your Firebase project.
   - Optionally, deploy the web interface to a public server or host locally for development and testing.

## Usage

- **User Registration**: Administrators can add users through the web interface, assigning each a unique QR code linked to their profile.
- **Accessing the Door**: Users gain entry by scanning their assigned QR code at the door's QR scanner.
- **Access Monitoring**: Administrators can track and monitor entry logs in real-time through the web interface.

## Contributing

We welcome contributions to the Secure Door System. To contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Vamshi Krishna Vanam** - vanamvamshi1998@gmail.com
- **Project Link** - [https://github.com/vanamvamshikrishna1998/SecureDoorSystem](https://github.com/vanamvamshikrishna1998/SecureDoorSystem)

## Acknowledgements

- [Espressif Systems](https://www.espressif.com/)
- [Firebase](https://firebase.google.com/)
- [Arduino](https://www.arduino.cc/)
