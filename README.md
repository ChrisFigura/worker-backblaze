# Backblaze script for Cloudflare Workers

This is a script for serving content from a public Backblaze B2 bucket using Cloudflare Workers.

## Wrangler

You can generate a Cloudflare Workers project with this using [wrangler](https://developers.cloudflare.com/workers/tooling/wrangler).

```bash
wrangler generate https://github.com/chrisfigura/worker-backblaze-template
```

## Usage

After generating a copy of this template, enter the necessary information into **wrangler.toml** including the **BUCKET_NAME** environmental variable.