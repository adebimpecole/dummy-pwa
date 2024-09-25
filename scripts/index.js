(function () {
  if ("serviceWorker" in navigator) {
    window.onload = () => {
      navigator.serviceWorker.register("/service-worker.js");
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    fetchBooks("recent");
    fetchBooks("new");
    fetchBooks("related");
  });

  function fetchBooks(type) {
    fetch(`/api/books/${type}`)
      .then((response) => response.json())
      .then((books) => {
        const container = document.getElementById(`${type}-books-list`);
        books.forEach((book) => {
          const bookElement = document.createElement("div");
          bookElement.className = "book";
          bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Rating: ${book.rating} / 5</p>
            `;
          container.appendChild(bookElement);
        });
      })
      .catch((error) => console.error("Error fetching books:", error));
  }
})();
