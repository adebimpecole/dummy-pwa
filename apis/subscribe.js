let subscriptions = []; // Temporary storage; replace with a database in real implementation

export default function handler(req, res) {
  if (req.method === "POST") {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({ message: "Subscription added successfully." });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
