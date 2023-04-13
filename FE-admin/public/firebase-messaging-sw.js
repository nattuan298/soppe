importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyByzmuLv9x73st6nv8lcrCytH3hFB36QRE",
  projectId: "scm-connect-app",
  messagingSenderId: "257302951258",
  appId: "1:257302951258:web:64c6d1562ba8862bb66f63",
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

