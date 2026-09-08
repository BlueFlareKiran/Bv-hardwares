# Security, spam protection and SEO setup

This patch adds layered protection for website enquiries, career applications and careers-admin login, plus an SEO pass for product/category pages.

## 1. Rate limiting

The code supports two rate-limit backends:

- `memory` — suitable for local development only.
- `upstash` — recommended for production/serverless deployments because all instances share one counter store.

### Production setup

Create an Upstash Redis database and add these environment variables to the production deployment:

```env
RATE_LIMIT_MODE=upstash
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
RATE_LIMIT_HASH_SECRET=<long random value>
```

Generate `RATE_LIMIT_HASH_SECRET` as a long random string (32+ bytes is recommended). It is used to HMAC email/IP-derived identities before they become rate-limit keys.

### Limits currently enforced

Contact enquiries:

- 3 submissions per 10 minutes per connection/IP identity.
- 10 submissions per day per connection/IP identity.
- 3 submissions per hour per email identity.
- Identical enquiry payloads are blocked for 10 minutes after a successful delivery.

Career applications:

- 3 applications per 30 minutes per connection/IP identity.
- 5 applications per day per connection/IP identity.
- 2 applications per day for the same email + job combination.
- The same email + job + resume combination is blocked for 24 hours after successful delivery.

Careers admin login:

- 8 attempts per 15 minutes per connection/IP identity.

Rate-limited responses use HTTP `429` and include a `Retry-After` header.

## 2. Cloudflare Turnstile

Turnstile is optional until keys are configured. Once `TURNSTILE_SECRET_KEY` exists, server-side verification is required for Contact and Careers submissions.

Create a Turnstile widget for the production domain and set:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
TURNSTILE_EXPECTED_HOSTNAME=bvhardwares.in
```

For localhost testing, either leave Turnstile variables empty or use Cloudflare's testing keys.

Do not configure only the server secret without the public site key, because the browser would have no widget with which to obtain a token.

## 3. Existing anti-spam layers retained

The forms also continue to use:

- honeypot fields;
- minimum form-completion time checks;
- field length limits;
- email validation;
- same-origin POST checks;
- resume size/type/signature validation for careers;
- Gmail is called only after validation and spam checks pass.

## 4. SEO changes

The patch adds or improves:

- Bengaluru-focused, unique metadata for every product category;
- a dedicated SEO title/description for barcode printer repair and maintenance;
- `Service` JSON-LD for `/products/service`;
- `BreadcrumbList` and `ItemList` remain on category pages;
- Search Console and Bing verification hooks;
- Vercel preview deployments are marked non-indexable while production remains indexable;
- the top product-card images are eagerly loaded to address the above-the-fold LCP warning;
- more focused Products and Contact page titles.

## 5. Google Search Console

After production deployment:

1. Add `https://bvhardwares.in` to Google Search Console.
2. Use the HTML tag verification method if desired.
3. Copy only the verification token into:

```env
GOOGLE_SITE_VERIFICATION=...
```

4. Redeploy.
5. Submit:

```text
https://bvhardwares.in/sitemap.xml
```

## 6. Bing Webmaster Tools

For Bing's meta-tag verification token, set:

```env
BING_SITE_VERIFICATION=...
```

and redeploy.

## 7. Production checklist

Before going live with these protections:

```env
EMAIL_MODE=gmail
GMAIL_USER=...
GMAIL_APP_PASSWORD=...
CONTACT_EMAIL=...
CAREERS_EMAIL=...

RATE_LIMIT_MODE=upstash
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
RATE_LIMIT_HASH_SECRET=...

NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
TURNSTILE_EXPECTED_HOSTNAME=bvhardwares.in
```

Then run:

```powershell
npm run lint
npm run build
```

Test at least one successful Contact enquiry and one Careers application after deployment, then intentionally retry enough times to confirm that rate-limited requests return a clear user-facing error instead of sending additional email.
