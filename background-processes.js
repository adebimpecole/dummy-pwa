self.onmessage = function (event) {
  const messageData = event.data;

  console.log("Message received from Service Worker:", messageData);

  self.postMessage({ action: "showNotification", data: messageData });
};
