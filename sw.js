const CACHE_NAME = 'juego-impostor-v1';
const urlsToCache = [
    '/',
    'index.html',
    'https://raw.githubusercontent.com/ManuelVS8/Audios-juegos-SCIENCE/refs/heads/main/icono.ico',
    'https://raw.githubusercontent.com/ManuelVS8/Efectos_audio/refs/heads/main/Siurot.png',
    'https://raw.githubusercontent.com/ManuelVS8/Efectos_audio/main/Tap.mp3',
    'https://raw.githubusercontent.com/ManuelVS8/Efectos_audio/main/Completado.mp3'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});