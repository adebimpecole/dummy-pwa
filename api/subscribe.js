
export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const subscription = req.body;
      subscriptions.push(subscription);
      res.status(201).json({ message: "Subscription added successfully." });
    } catch (error) {
      res.status(500).json({ message: "Error adding subscription", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

