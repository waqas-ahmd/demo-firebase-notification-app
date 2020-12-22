/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.1.2/firebase.js");
importScripts("https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCKWzD6JzEM65ZtAVvnZwBYxLrcDZnLuyA",
  authDomain: "custom-notification-app.firebaseapp.com",
  projectId: "custom-notification-app",
  storageBucket: "custom-notification-app.appspot.com",
  messagingSenderId: "300941483893",
  appId: "1:300941483893:web:c822e42729c1d6f3fb7d3c",
});

firebase.messaging();
