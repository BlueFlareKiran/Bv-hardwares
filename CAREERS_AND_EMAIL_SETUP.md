# BV Hardwares — Careers and Gmail setup

This patch is based on `Bv-hardwares-main (1)(1).zip` and brings across the Careers/contact features from `Bv-hardwares-main(2).zip`.

## Apply the patch

1. Back up or commit your current work.
2. Extract the changed-files ZIP and copy its contents into your project root (beside `package.json`), replacing matching files. Include `.env.example` and `.gitignore`.
3. Run `npm ci` to install the dependencies from the updated lockfile.
4. Copy `.env.example` to `.env.local` if you do not already have one. If you do, merge the new variable names into it without overwriting your existing secrets.
5. Configure the values below, then run `npm run dev`.

No existing source files need deleting when applying to the stated baseline. The earlier Resend helper is not included or imported by this patch. If you already applied an older Careers patch, remove its unused `lib/server/resend.ts` and obsolete Resend variables.

## Included features

- `/careers`: published jobs, filters, job details and application pages.
- Admin login from the Careers page; add, edit, draft/publish and delete jobs.
- `/careers/admin` and `/careers/admin/dashboard` redirect to the integrated Careers workspace.
- Server-side Contact enquiry submission with loading, success and error states.
- Careers applications with PDF/DOC/DOCX resumes up to 3 MB.
- Shared `lib/server/email.ts` for both forms; no Resend API or dependency.
- Careers links in desktop/mobile navigation, footer and sitemap.
- The supplied job records are carried across unchanged. Review the roles and publish states before making the site public.

## Local testing without sending emails

```dotenv
EMAIL_MODE=mock
```

Both endpoints validate submissions and return a mock success. The forms explicitly display that no email was sent. Mock mode requires no Gmail credentials and does not log personal details or resume content. Submissions and resumes are not stored.

If `EMAIL_MODE` is omitted during local development, mock mode is used. In production, an omitted or invalid mode returns a configuration error instead of silently accepting an enquiry.

## Gmail delivery

Enable 2-Step Verification for the sending Google account, then generate a Google App Password named, for example, “BV Hardwares Website”. Use that App Password, not your regular Google account password.

- [Google: create and use App Passwords](https://support.google.com/accounts/answer/185833?hl=en)
- [Create an App Password](https://myaccount.google.com/apppasswords)
- [Nodemailer: using Gmail](https://nodemailer.com/guides/using-gmail)

Some managed accounts and accounts with Advanced Protection do not offer App Passwords; check the Google help page if the option is missing.

```dotenv
EMAIL_MODE=gmail
GMAIL_USER=your-sending-account@gmail.com
GMAIL_APP_PASSWORD=your-google-app-password
CONTACT_EMAIL=info@bvhardwares.in
CAREERS_EMAIL=info@bvhardwares.in
```

`GMAIL_USER` must be the Google account that issued the App Password. A Google Workspace address can also be used if its account permits this. Spaces in the App Password are removed automatically.

Mail is sent with Nodemailer over TLS to `smtp.gmail.com:465`. The From address is `GMAIL_USER`, with the display name “Bhagyashree Ventures”. Contact enquiries go to `CONTACT_EMAIL`; applications go to `CAREERS_EMAIL`. These recipient addresses can be Gmail or company inboxes. Each variable accepts one email address. If blank, Contact uses the site email; Careers uses `CONTACT_EMAIL`, then the site email.

Both forms set the visitor/candidate address as Reply-To. Clicking Reply in the received email addresses that person. Resumes are attached as binary file content and are not saved to the repo or GitHub. A successful response means Gmail accepted the message, not a guarantee of final inbox placement. Sending failures produce an error and keep the form available for retry.

Remove the obsolete `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL_MODE` and `CAREERS_EMAIL_MODE` variables. Only `EMAIL_MODE` selects delivery for both forms.

Never put these settings in `NEXT_PUBLIC_*` variables or commit `.env.local`. Configure credentials directly in your environment; do not paste them into chat.

## Careers admin

```dotenv
CAREERS_ADMIN_USERNAME=your-admin-name
CAREERS_ADMIN_PASSWORD=choose-a-long-unique-password
CAREERS_SESSION_SECRET=generate-a-random-secret
```

Generate a session secret locally:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The server checks the credentials and issues a signed, HTTP-only session cookie, valid for eight hours. Visit `/careers` and use the Admin login. The original combined public/admin workspace is preserved.

## Job persistence

Locally, without GitHub configuration, admin edits write to `data/careers.json`.

For production editing, configure:

```dotenv
GITHUB_CAREERS_REPO=Shivasaiyadav08/Bv-hardwares
GITHUB_CAREERS_TOKEN=your-repository-scoped-token
GITHUB_CAREERS_BRANCH=main
GITHUB_CAREERS_PATH=data/careers.json
```

Use the correct repository/branch for your deployment. The token needs repository Contents read/write permission, and the branch rules must permit the writes. The existing GitHub Contents API storage implementation commits job edits to that file. Public pages read the remote data when configured and fall back to bundled data if the read fails. Production editing fails clearly without writable GitHub storage; the deployed filesystem is not used for persistent edits. No database is introduced.

The inherited job store and in-memory rate limiter are intended for this small-site workflow. Rate counters are per process, and concurrent admin edits are not transactionally merged; use one editor at a time.

## Deploy on Vercel

Add the Gmail, inbox, admin and GitHub settings in your project's Environment Variables. Set `EMAIL_MODE=gmail` for real delivery and redeploy after changes. Keep preview environments on mock mode if you do not want them sending mail.

After deploying:

1. Send a Contact enquiry and verify it arrives in `CONTACT_EMAIL`.
2. Apply to a published job with a real small PDF; verify the attachment opens in `CAREERS_EMAIL`.
3. Click Reply on each email and confirm the visitor/candidate address is selected.
4. Check admin login and save a job draft to verify GitHub permissions.

The patch is supplied without credentials. Live Gmail delivery and live GitHub writes must be checked in your configured environment.

## Validation performed

- `npm run build`: passed, including TypeScript and generation of 142 static pages.
- ESLint on all added/modified application code: passed.
- 18 integration checks: passed for validation, mock delivery, production configuration errors, Gmail routing and Reply-To, resume bytes, actual Nodemailer MIME encoding, SMTP failures and signed admin sessions. Gmail SMTP was simulated; no real email was sent.
- Production HTTP smoke checks: Careers listing, job detail, application and Contact pages returned 200; both APIs accepted valid mock submissions; unauthenticated admin access returned 401.
- Live Gmail authentication/delivery and GitHub persistence were not tested because deployment credentials were not supplied.
