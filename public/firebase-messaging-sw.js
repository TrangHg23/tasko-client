importScripts(
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCc91HVd0odTUexuik6u11SuGrSwxqODto",
  projectId: "tasko-f1748",
  messagingSenderId: "394433719296",
  appId: "1:394433719296:web:2a9660e1b8172a33cc3ce5",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
