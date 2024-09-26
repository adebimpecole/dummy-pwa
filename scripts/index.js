if ("serviceWorker" in navigator && "PushManager" in window) {
  window.onload = () => {
    if (Notification.permission === "default") {
      // Permission not granted or denied yet; request permission
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Permission granted for notifications.");
          // Proceed to subscribe for push notifications
        } else {
          console.error("Permission denied for notifications.");
        }
      });
    } else if (Notification.permission === "granted") {
      console.log("Notifications are already granted.");
      // Proceed to subscribe for push notifications
    } else {
      console.error("Notifications are denied.");
    }

    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        return registration.pushManager
          .getSubscription()
          .then(async (subscription) => {
            if (subscription) {
              const text = "This is my payload!";
              await fetch("/api/sendNotification", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  subscription,
                  text,
                }),
              });
              return subscription;
            }

            const response = await fetch("/api/vapid-public-key");
            const vapidPublicKey = await response.text();
            console.log(vapidPublicKey);
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

            return registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey,
            });
          });
      })
      .then((subscription) => {
        return fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscription }),
        });
      })
      .catch((error) => {
        console.error("Service Worker or Push subscription error:", error);
      });
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
