export default function handler(req, res) {
  if (req.method === "GET") {
    let books = [
      { id: 1, title: "Book One", author: "Author One", rating: 4.5 },
      { id: 2, title: "Book Two", author: "Author Two", rating: 4.0 },
      { id: 3, title: "Book Three", author: "Author Three", rating: 4.2 },
      { id: 4, title: "Book Four", author: "Author Four", rating: 3.9 },
      { id: 5, title: "Book Five", author: "Author Five", rating: 4.3 },
      { id: 6, title: "Book Six", author: "Author Six", rating: 4.0 },
      { id: 7, title: "Book Seven", author: "Author Seven", rating: 3.4 },
      { id: 8, title: "Book Eight", author: "Author Eight", rating: 4.2 },
      { id: 9, title: "Book Nine", author: "Author Nine", rating: 3.4 },
      { id: 10, title: "Book Ten", author: "Author Ten", rating: 4.0 },
      { id: 11, title: "Book Eleven", author: "Author Eleven", rating: 4.2 },
      { id: 12, title: "Book Twelve", author: "Author Twelve", rating: 4.0 },
    ];
    res.status(200).json(books);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
