const webPush = require("web-push");

// Set VAPID keys
const vapidKeys = {
  publicKey:
    "BIaQhF5lDg7L5pqnXGFh9QN8OT7ymEutB7w7xYo-gM_XZBALLIPL37r4siGYmFIa-E2GWu8ban5mUkSDHthUXuY",
  privateKey: "h0K6hYWv4ng0nCBzQUio8EpKabG9ZAQR2jUOSdgLD0U",
};

// Configure web-push with VAPID details
webPush.setVapidDetails(
  "mailto:ciacoleman988@gmail.com", // Replace with your email
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export default function handler(req, res) {
  if (req.method === "POST") {
    const subscription = req.body.subscription;
    const payload = req.body.text;
    const options = {
      TTL: 60,
    };
    console.log("Reached!");
    webPush
      .sendNotification(subscription, payload, options)
      .then(() => {
        res.status(201); // Send status only once
      })
      .catch((error) => {
        console.error("Error sending notification", error);
        res.status(500);
      });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
