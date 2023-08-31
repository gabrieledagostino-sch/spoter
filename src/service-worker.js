/// <reference types="@sveltejs/kit" />
import { files, version } from '$service-worker';
 
// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;
 
const ASSETS = [
    ...files,  // everything in `static`
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
        console.log("cachename",CACHE)
        for (const key of await caches.keys()) {
            console.log(key)
            if (key !== CACHE) await caches.delete(key);
        }
    }
 
    event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE)
        console.log(event.request.url)
        //if it doesn't and with js, css or html is cachable
        const nonCachable = ['.js', '.css', '.html']
        const isCachable = !nonCachable.some(extension => event.request.url.endsWith(extension))
        console.log(isCachable)
        //Stale-while-revalidate
        if(isCachable || ASSETS.includes(event.request.url)) return cache.match(event.request).then(cached => {
            const fetched = fetch(event.request).then(network => {
                cache.put(event.request, network.clone())
                return network
            })
            return cached || fetched
        })
        console.log('reached here')
        //Network first fallback offline page
        return fetch(event.request)
        .then(res => res||cache.match('/offline.html'))
        .catch(() => {
            return cache.match('/offline.html')
        })
    })())
})