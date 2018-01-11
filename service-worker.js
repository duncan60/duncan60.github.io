var cacheName = 'latestResume-2018-v2';

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
  if (/\.jpg$|.png$/.test(event.request.url)) {
    var supportsWebp = false;
    if (event.request.headers.has('accept')) {
      supportsWebp = event.request.headers.get('accept').includes('webp');
    }

    if (supportsWebp) {
      var req = event.request.clone();

      var returnUrl = req.url.substr(0, req.url.lastIndexOf('.')) + '.webp';

      event.respondWith(
        fetch(returnUrl, {
          mode: 'no-cors'
        })
      );
    }
  } else {
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
  }
});
