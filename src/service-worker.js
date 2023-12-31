/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';
 
// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;
 
const ASSETS = [
    ...files,  // everything in `static`
];
const nonCachable = ['/profile', '/discover', '/discoverQueue', '/logout', '/login', '/callback']
const nonCachableExtensions = ['.js', '.css', '.html', '/']
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

/**
 * Cache strategy :
 *  static files go cache first
 *  online static files, like song pictures go stale-while-revalidate
 *  dynamic files, like pages scripts and css go network first or fallback to offline page
 */
self.addEventListener('fetch', (event) => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE)

        //if it doesn't end with js, css or html is cachable (static file)
        let isCachable = !nonCachable.some(sub => event.request.url.includes(sub))
        isCachable = isCachable && !nonCachableExtensions.some(extension => event.request.url.endsWith(extension))
        
        const url = new URL(event.request.url)

        //static files always served from cache
        if(ASSETS.includes(url.pathname)) { 
            return cache.match(url.pathname)
        }

        if(build.includes(url.pathname)) { 
            return fetch(event.request)
            .then(res => res||cache.match('/offline.html'))
            .catch(() => {
                return cache.match('/offline.html')
            })
        }
        
        //Stale-while-revalidate for online static files
        if(isCachable) {
            return cache.match(event.request).then(cached => {
                const fetched = fetch(event.request).then(network => {
                    cache.put(event.request, network.clone())
                    return network
                })
                return cached || fetched
            })
        }
        
        return fetch(event.request)
        .then(res => res||cache.match('/offline.html'))
        .catch(() => {
            return cache.match('/offline.html')
        })
    })())
})
