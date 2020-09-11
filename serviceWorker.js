self.addEventListener("install", (e) => {
  try {
    e.waitUntill(
      caches.open("static").then((cache) => {
        return cache.addAll("./", "./css/style.css", "./js/script.js");
      })
    );
  } catch (error) {
    console.log(error.statusText);
  }
});

self.addEventListener("fetch", (e) => {
  try {
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  } catch (error) {}
});
