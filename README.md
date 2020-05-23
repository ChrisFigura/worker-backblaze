# Backblaze B2 Worker

This is a script for serving content from a public Backblaze B2 bucket using Cloudflare Workers.

You can generate a Cloudflare Workers project for this using [wrangler](https://developers.cloudflare.com/workers/tooling/wrangler).

```bash
wrangler generate name-of-project https://github.com/chrisfigura/worker-backblaze
```

## Usage

After generating a copy of this template, enter the necessary information into **wrangler.toml** including the **BUCKET_NAME** environmental variable.

In Cloudflare, create a CNAME record with the hostname of the B2 bucket for the worker's route.
