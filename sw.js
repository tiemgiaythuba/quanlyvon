const CACHE_NAME = 'tiem-thu-ba-v1';
const urlsToCache = [
  './',
  './index.html',
  './tachnen.jpg',
  './manifest.json'
];

// Cài đặt Service Worker và lưu các file vào bộ nhớ đệm (Cache)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Đã lưu cache thành công');
        return cache.addAll(urlsToCache);
      })
  );
});

// Chặn các yêu cầu tải trang để trả về file từ Cache nếu không có mạng
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Trả về dữ liệu từ cache nếu có, nếu không thì tải từ mạng
        return response || fetch(event.request);
      })
  );
});

// Xóa các cache cũ nếu có bản cập nhật mới
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
