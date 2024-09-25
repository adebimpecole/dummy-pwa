const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", require("./routes/api"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
