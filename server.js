const express = require("express");
const cors = require("cors");
const webPush = require("web-push");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// VAPID keys should be generated only once.
const vapidKeys = {
  publicKey:
    "BIaQhF5lDg7L5pqnXGFh9QN8OT7ymEutB7w7xYo-gM_XZBALLIPL37r4siGYmFIa-E2GWu8ban5mUkSDHthUXuY", // Your generated public key
  privateKey: "h0K6hYWv4ng0nCBzQUio8EpKabG9ZAQR2jUOSdgLD0U", // Your generated private key
};


// Configure web-push
webPush.setVapidDetails(
  "mailto:your-email@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Function to send notifications to all subscribers
const sendNotifications = (message) => {
  subscriptions.forEach((subscription) => {
    webPush
      .sendNotification(subscription, JSON.stringify(message))
      .then((result) => console.log("Notification sent!"))
      .catch((err) => console.error("Error sending notification", err));
  });
};

// Send notification every 30 seconds to all subscribers
setInterval(() => {
  const notificationPayload = {
    title: "Library Update",
    body: "Check out new books added to our collection!",
    icon: "/icons/icon-192x192.png",
    url: "/",
  };

  sendNotifications(notificationPayload);
}, 30000); // Notification sent every 30 seconds

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
