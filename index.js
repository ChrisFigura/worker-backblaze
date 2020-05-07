addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

// The path used for fetching files from the bucket.
const b2path = `/file/${BUCKET_NAME}/`

// Headers Backblaze adds that I should remove.
const b2headers = [
    'x-bz-content-sha1',
    'x-bz-file-id',
    'x-bz-file-name',
    'x-bz-info-src_last_modified_millis',
    'X-Bz-Upload-Timestamp',
    'Expires'
];

/**
 * Serve content from the B2 bucket.
 *
 * @param {Request} request
 */
async function handleRequest(request) {
    // Make sure the environmental variable for the bucket was set.
    if (BUCKET_NAME === "") {
        throw "Bucket name not set";
    }

    // Update the request for B2.
    let b2request = updateRequest(request);

    // Fetch the response
    let response = await fetch(b2request);

    // Remove B2 headers.
    let headers = updateHeaders(response.headers);

    // Return the response with the updated headers.
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers
    });
}

/**
 * Updates a request for serving from a B2 bucket.
 *
 * @param {Request} request The Request to be updated.
 */
function updateRequest(request) {
    // Copy the request's URL.
    let url = new URL(request.url);

    // Update the path for B2.
    url.pathname = b2path + url.pathname;

    // Return the updated request.
    return new Request(url, {
        method: request.method,
        headers: request.headers
    })
}

/**
 * Updates headers from a Backblaze B2 response so all of Backblaze's headers
 * are removed.
 *
 * @param {Headers} headers The Headers to be updated.
 */
function updateHeaders(headers) {
    // Make a copy of the request's headers.
    let headers = new Headers(headers);

    // Delete the headers Backblaze adds.
    b2headers.forEach(header => {
        headers.delete(header);
    })

    // Return the new headers.
    return headers;
}