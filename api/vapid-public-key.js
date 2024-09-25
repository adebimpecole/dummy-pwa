export default function handler(req, res) {
  if (req.method === "GET") {
    console.log(process.env.VAPID_PUBLIC_KEY);
    res.send(process.env.VAPID_PUBLIC_KEY);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
