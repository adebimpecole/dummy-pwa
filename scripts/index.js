if ("serviceWorker" in navigator && "PushManager" in window) {
  window.onload = async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );

      let subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        const payload = "This is my payload"; // Define your payload here
        await fetch("/api/sendNotification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscription,
            payload,
          }),
        });
      } else {
        const response = await fetch("/api/vapid-public-key");
        const vapidPublicKey = await response.text();
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        });

        // After subscribing, send the subscription to the server
        await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscription }),
        });
      }

      console.log("User is subscribed!");
    } catch (error) {
      console.error("Service Worker or Push subscription error:", error);
    }
  };
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

document.getElementById("doIt").onclick = () => {
  const payload = document.getElementById("notification-payload").value;
  const delay = document.getElementById("notification-delay").value;
  const ttl = document.getElementById("notification-ttl").value;
};

function fetchBooks(type) {
  fetch(`/api/${type}`)
    .then((response) => response.json())
    .then((books) => {
      const container = document.getElementById(`${type}-books-list`);
      if (container) {
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
      } else {
        console.error(`Container with id '${type}-books-list' not found`);
      }
    })
    .catch((error) => console.error("Error fetching books:", error));
}
