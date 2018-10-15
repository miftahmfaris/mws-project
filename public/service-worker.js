let cache_name = "cache-v1";
let cacheAdded = [
  "/index.html",
  "/asset/css/index.css",
  "/asset/css/project1.css",
  "/asset/css/project2.css",
  "/asset/js/index.js",
  "/asset/js/project1.js",
  "/asset/js/project2.js",
  "/asset/images/logo.svg",
  "/asset/images/profilepict.jpeg",
  "/project1/project1.html",
  "/project2/project2.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cache_name).then(cache => {
      return cache.addAll(cacheAdded);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return (
              cacheName.startsWith("cache-") && !allCaches.includes(cacheName)
            );
          })
          .map(cacheName => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  console.log("Request event for ", event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          if (response.status === 404) {
            console.log("Page not Found");
          }
          return caches.open(cacheAdded).then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch(error => {
        return error;
      })
  );
});
