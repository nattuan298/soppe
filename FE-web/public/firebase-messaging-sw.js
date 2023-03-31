importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCi-whiGvoJUYF40_AJSngyCAEBy4iRAeI",
  projectId: "scm-connext",
  messagingSenderId: "257302951258",
  appId: "1:228267036312:web:d7bbb62d2323f59db98aed",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

