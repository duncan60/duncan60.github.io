var cacheName = 'latestResume-2018-v1';

// Cache our known resources during install
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache =>
        cache.addAll([
          './index.htm',
          './css/form.css',
          './css/normalize.css',
          './css/responsive.css',
          './css/fonts/icomoon.eot',
          './css/fonts/icomoon.svg',
          './css/fonts/icomoon.ttf',
          './css/fonts/icomoon.woff',
          './js/app.min.js'
        ])
      )
  );
});

// Cache any new resources as they are fetched
self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then(function(response) {
        if (response) {
          return response;
        }
        var requestToCache = event.request.clone();
        return fetch(requestToCache).then(function(response) {
          if (!response || response.status !== 200) {
            return response;
          }
          var responseToCache = response.clone();
          caches.open(cacheName).then(function(cache) {
            cache.put(requestToCache, responseToCache);
          });
          return response;
        });
      })
  );
});
