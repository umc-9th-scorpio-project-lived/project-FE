importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyAzgW1zFXwdePjyMatVyCqrhxofZmb_0Bs',
  authDomain: 'lived-74b7c.firebaseapp.com',
  projectId: 'lived-74b7c',
  messagingSenderId: '940133939448',
  appId: '1:940133939448:web:35c553fca8b20d9a1ce30d',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || payload.data?.title || '알림';

  const body = payload.notification?.body || payload.data?.body || '';

  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    data: payload.data,
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes('/lived') && 'focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow('/lived');
      })
  );
});
