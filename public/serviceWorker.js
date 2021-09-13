const staticGrannyPlant = 'granny-plant';
const assets = ['/', '/main.js', '/style.css'];

self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticGrannyPlant).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (fetchEvent) => {
  const request = fetchEvent.request;
  if (request.method === 'GET') {
    fetchEvent.respondWith(
      fetch(request).catch((error) =>
        caches.match(fetchEvent.request).then((res) => res)
      )
    );
  } else {
    return fetch(fetchEvent.request);
  }
});
