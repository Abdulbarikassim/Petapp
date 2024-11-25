var cacheName = "petstore-v1";
var cacheFiles = [
  "petstore.html",
  "products.js",
  "petstore.webmanifest",
  "images/cat_bowl.jpg",
  "images/cat_yarn.jpg",
  "images/cat_litter.jpg",
  "images/icon-store-512.png",
  "images/water_dispenser.jpg",
  "images/wetfood.jpg",
];

// self.addEventListener("install", (e) => {
//   console.log("[Service Worker] Install");
//   e.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       console.log("[Service Worker] Caching all the files");
//       return cache.addAll(cacheFiles);
//     })
//   );
// });

self.addEventListener("fetch", (e) => {
  console.log("[Service Worker] Fetched resource " + e.request.url);
});
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      // Download the file if it is not in the cache,
      return (
        r ||
        fetch(e.request).then(function (response) {
          // add the new file to cache
          return caches.open(cacheName).then(function (cache) {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
