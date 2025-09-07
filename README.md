# 918Runs

Monorepo structure:
- frontend/ — React 18 + Vite SPA (deployed to GitHub Pages)
- server/ — Express API (deployed to Render)

Brand guardrails (non-negotiable):
- Colors via CSS vars only:
  --red: #C8262D; --navy: #0F1B2D; --cream: #F5F1E8; --white: #FFFFFF
- Typography: Montserrat + Open Sans only.
- No additional colors are allowed anywhere in the codebase.

Deployment:
- Frontend: GitHub Pages at https://<username>.github.io/918Runs/
- Backend: Render Web Service (CORS restricted to GH Pages origin).

Security & privacy:
- No secrets in the frontend. Use server-side proxies for Buttondown and signing uploads.
- No PII in logs. GDPR-friendly newsletter opt-in and a Privacy Policy page.


