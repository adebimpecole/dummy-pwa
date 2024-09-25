exports.sendNotification = (req, res) => {
  // Simulate sending a push notification
  console.log("Sending push notification...");
  res.json({ message: "Push notification sent successfully" });
};
