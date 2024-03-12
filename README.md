## Overview
This React Native project consists of multiple screens designed to create a seamless user experience for authentication, location sharing, and data retrieval. Below is a brief description of each screen and its functionality.

## Screens

### 1. Login Screen
- Allows users to log in to the application using their email and password.
- Provides options to navigate to the registration screen (SignUp) or reset the forgotten password (Not Implemented Yet).
- Implements form validation and error handling for a smooth user experience.
- Supports social login using Google, Apple, and Facebook.

### 2. SignUp Screen
- Enables new users to register for the application by providing their full name, email, and password.
- Implements form validation to ensure all required fields are filled correctly.
- Allows users to sign up with their existing Google, Apple, or Facebook accounts.
- Provides a link to navigate back to the login screen.

### 3. Send Location Screen
- Allows authenticated users to send their current location along with an optional image attachment.
- Utilizes device permissions to access the camera for capturing images.
- Validates user input and handles network requests securely.
- Provides options to fetch data from the server or log out from the application.

### 4. Retrieve Location Screen
- Enables users to retrieve previously sent location data and associated images.
- Fetches data securely from the server using authentication tokens.
- Displays retrieved images with their respective locations.
- Provides a button to fetch new data and refresh the screen.

## Usage
To run this React Native project locally:

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies using `npm install` or `yarn install`.
3. Run the project on an Android or iOS emulator/device using `npx react-native run-android` or `npx react-native run-ios`.
4. Ensure proper network connectivity and permissions for camera access if using the Send Location feature.

## Dependencies
This project relies on the following dependencies:
- Axios: for making HTTP requests to the backend server.
- React Navigation: for handling navigation between screens.
- AsyncStorage: for storing authentication tokens locally.
- ImagePicker: for capturing images from the device camera.

## Notes
- This README provides a high-level overview of the project structure and functionality.
- Detailed implementation and code documentation can be found within the source code files.
