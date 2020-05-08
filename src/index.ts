import { handleRequest } from './handler'

// Handle requests using the handleRequest method in handler.ts
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
