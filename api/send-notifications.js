const webPush = require("web-push");

export default function handler(req, res) {
  if (req.method === "POST") {
    const subscription = req.body.subscription;
    const payload = req.body.payload;
    const options = {
      TTL: req.body.ttl || 60, // Default TTL of 60 seconds
    };

    // Use setTimeout to send notification after the specified delay
    setInterval(() => {
      webPush
        .sendNotification(subscription, payload, options)
        .then(() => {
          res.sendStatus(201); // Send status only once
        })
        .catch((error) => {
          console.error("Error sending notification", error);
          res.sendStatus(500);
        });
    }, 6000);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
