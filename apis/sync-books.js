export default function handler(req, res) {
  if (req.method === "POST") {
    // Add logic to sync the latest books here
    console.log("Sync books route hit"); // Log to console for debugging

    // Perform book syncing logic
    res.status(200).json({ message: "Books synced" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
