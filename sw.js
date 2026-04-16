const CACHE_NAME = "min-pwa-v1";
const ASSETS = [
  "./",
  "./index.html", //Page where the sw will be installed from
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

//Fired once when the service worker is installed
self.addEventListener("install", (event) => 
{
    event.waitUntil(caches.open(CACHE_NAME) //
                          .then((cache) => cache.addAll(ASSETS)) //Add all files in ASSETS to the cache
                   );
    self.skipWaiting(); //Activate immediately
}); //install

//Triggered after install
// Clean up and version control
self.addEventListener("activate", (event) => 
{
  //Cache grows indefinitely
  //- Delete all caches except current one
  event.waitUntil
  (
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null))) 
    )
  );

  //Take control of all open pages
  self.clients.claim();
}); //activate

//Triggered by every network request from the page
self.addEventListener("fetch", (event) => 
{
  //Ensure only GET requests are handled
  if (event.request.method !== "GET") return;

  //Overrides the browser's default fetch
  //- First check the cache.
  event.respondWith
  (
    caches.match(event.request)  //Filter caches for the current request
          .then((cached) => cached //If found, use it
                 || fetch(event.request)) //else, fetch from the network
  );
}); //fetch
