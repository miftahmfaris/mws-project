if (!("serviceWorker" in navigator)) {
  console.log("Browser tidak mendukung");
} else {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => {
      console.log("Service Worker Terdaftar");
    })
    .catch(e => {
      console.log(e);
    });
}
