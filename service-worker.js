const CACHE_NAME = 'flashcards-pwa-v1';

// Danh sách tài nguyên cần cache để app chạy offline 100%
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    // CDN Thư viện giao diện & xử lý Excel
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js'
];

// 1. CÀI ĐẶT SERVICE WORKER (Pre-cache static assets)
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Pre-caching static assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .catch((err) => {
                console.warn('[Service Worker] Pre-cache initial warning (handled):', err);
            })
    );
});

// 2. KÍCH HOẠT SERVICE WORKER (Dọn dẹp cache cũ, không đụng vào localStorage)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 3. XỬ LÝ FETCH (Cache First với Network Fallback)
self.addEventListener('fetch', (event) => {
    // Chỉ xử lý các yêu cầu GET
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Trả về tài nguyên trong Cache nếu có
                // Đồng thời cập nhật ngầm nếu có mạng (Stale-while-revalidate)
                fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
                    }
                }).catch(() => {/* Offline mode - ignore fetch error */});

                return cachedResponse;
            }

            // Nếu chưa có trong Cache, lấy từ Network và lưu lại vào Cache
            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && networkResponse.type !== 'cors') {
                    return networkResponse;
                }

                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(() => {
                // Khi không có mạng và không có trong cache, trả về index.html mặc định nếu là navigation
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
