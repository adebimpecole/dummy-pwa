const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/notificationsController");

// Background sync route
router.get("/sync", (req, res) => {
  // Simulate a data synchronization task
  console.log("Background sync task running...");
  res.json({ message: "Data synchronized successfully" });
});

// Push notification route
router.post("/notify", notificationsController.sendNotification);

module.exports = router;
