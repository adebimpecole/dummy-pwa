(function () {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );

        return registration.pushManager.subscribe({
          userVisibleOnly: true, // Always show notifications
          applicationServerKey: urlBase64ToUint8Array("Your_Public_VAPID_Key"), // Public VAPID key
        });
      })
      .then((subscription) => {
        // Send the subscription to your server to store it
        return fetch("/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
        });
      })
      .then((response) => {
        if (response.ok) {
          console.log("User is subscribed!");
        } else {
          console.error("Failed to subscribe user.");
        }
      })
      .catch((error) => {
        console.error("Service Worker or Push subscription error:", error);
      });
  }

  // Helper function to convert VAPID public key to Uint8Array
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
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