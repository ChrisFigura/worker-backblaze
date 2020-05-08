import { expect } from 'chai'
import { updateRequest } from '../src/handler'

describe('requestUpdate function', () => {
    it('Parse a blank request', () => {
        // The request without a path.
        const request = new Request("https://example.com/");

        // The request after being updated to be B2 compatible.
        const b2request = updateRequest(request);

        // Check to make sure the request was updated correctly.
        expect(request.url).to.equal(`https://example.com/file/${BUCKET_NAME}/`);
    })

    it('Parse requests for files at the root level', () => {
        // The different filenames to be tested.
        const files = [
            "a",
            "foo",
            "bar.png",
            "pneumonoultramicroscopicsilicovolcanoconiosis.exe",
        ]

        // Test each filename to see if it is updated correctly.
        files.forEach(file => {
            // The request for the file.
            const request = new Request(`https://example.com/${file}`);

            // The request after being updated to be B2 compatible.
            const b2request = updateRequest(request);

            // Check to make sure the request was updated correctly.
            expect(request.url).to.equal(`https://example.com/file/${BUCKET_NAME}/${file}`);
        })
    })

    it('Parse requests for files in nested directories', () => {
        // The different filenames to be tested.
        const files = [
            "a/b",
            "foo/bar",
            "bruh/moment/guh.exe",
            "apple/banana/orange/cranberry/raspberry.png",
        ]

        // Test each filename to see if it is updated correctly.
        files.forEach(file => {
            // The request for the file.
            const request = new Request(`https://example.com/${file}`);

            // The request after being updated to be B2 compatible.
            const b2request = updateRequest(request);

            // Check to make sure the request was updated correctly.
            expect(request.url).to.equal(`https://example.com/file/${BUCKET_NAME}/${file}`);
        })
    })
})

describe('responseUpdate function', () => {
    it('Backblaze headers are removed', () => {

    })
})
