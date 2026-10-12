const CACHE = 'examsetu-pwa-v1';
const LOCAL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(LOCAL))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', event => {
 const req=event.request;
 if(req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
 event.respondWith(fetch(req).then(res => { if(res.ok && ['document','script','style','image','manifest'].includes(req.destination)) { const copy=res.clone(); caches.open(CACHE).then(cache=>cache.put(req,copy)); } return res; }).catch(()=>caches.match(req)));
});
