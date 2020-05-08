// The path used for fetching files from the bucket.
const b2path = `/file/${BUCKET_NAME}`

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
 * @param request The request for content from the bucket.
 * @returns The response with the requested content.
 */
export async function handleRequest(request: Request): Promise<Response> {
    // Make sure the environmental variable for the bucket was set.
    if (BUCKET_NAME === "") {
        throw "Bucket name not set";
    }

    // Update the request for B2.
    let b2request = updateRequest(request);

    // Fetch the response from B2.
    let b2response = await fetch(b2request);

    // Remove Backblaze's headers from the response.
    let response = updateResponse(b2response);

    // Return the response.
    return response;
}

/**
 * Updates a request for serving from a B2 bucket.
 *
 * @param request The Request to be updated.
 * @returns The updated Request for fetching from the B2 bucket.
 */
function updateRequest(request: Request): Request {
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
 * Removes Backblaze's headers from a response.
 *
 * @param response The Response to be updated.
 * @returns The updated Response without Backblaze's headers.
 */
function updateResponse(response: Response): Response {
    // Copy the response's Headers.
    let headers = new Headers(response.headers);

    // Delete the headers Backblaze adds.
    b2headers.forEach(e => headers.delete(e));

    // Return the updated response.
    return new Response(response.body, {
        status: response.status,
        headers: headers
    })
}
