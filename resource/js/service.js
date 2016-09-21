importScripts('./cache-polyfill.js');
self.addEventListener('install', function(e) {
  console.log("Install Event");
  console.log(e);
  e.waitUntil();
});
