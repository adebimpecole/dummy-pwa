export default function handler(req, res) {
  if (req.method === "GET") {
    console.log(process.env.PUBLIC_KEY);
    res.send("BIaQhF5lDg7L5pqnXGFh9QN8OT7ymEutB7w7xYo-gM_XZBALLIPL37r4siGYmFIa-E2GWu8ban5mUkSDHthUXuY");
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
