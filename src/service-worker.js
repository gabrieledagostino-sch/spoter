/// <reference types="@sveltejs/kit" />
import { files, version } from '$service-worker';
 
// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;
 
const ASSETS = [
    ...files,  // everything in `static`
    '/offline'
];
 
self.addEventListener('install', (event) => {
  // Create a new cache and add all files to it
    async function addFilesToCache() {
        const cache = await caches.open(CACHE);
        await cache.addAll(ASSETS);
    }
    
    event.waitUntil(addFilesToCache());
});
 
self.addEventListener('activate', (event) => {
  // Remove previous cached data from disk
    async function deleteOldCaches() {
        for (const key of await caches.keys()) {
            if (key !== CACHE) await caches.delete(key);
        }
    }
 
    event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
    async function respond() {
        const cache = await caches.open(CACHE)

        //stale-while-revalidate for static files
        if(files.includes(event.request.url)) {
            return cache.match(event.request)
                .then(cached => {
                    const fetched = fetch(event.request).then(network => {
                        cache.put(event.request, network.clone())
                        return network
                    })
                    return cached || fetched
                })
        }
        //Network first fallback offline page
        return fetch(event.request)
        .catch(() => {
            return CACHE.match('/offline')
        })
    }

    event.waitUntil(respond())
})