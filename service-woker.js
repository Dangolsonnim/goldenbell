const CACHE_NAME = 'goldenbell-v1';
const urlsToCache = [
    '/goldenbell/',
    '/goldenbell/index.html',
    '/goldenbell/manifest.json',
    'https://i.ibb.co/CphjNYkV/maskable-icon-x128.png',
    'https://i.ibb.co/V0Q0dN4v/maskable-icon-x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return new Response('오프라인 상태입니다.');
            })
    );
});
