# acme-checkout-api (PatchPilot demo target)

A deliberately outdated Node + Python service used to demonstrate PatchPilot's
scanning, reachability triage, and remediation. **Do not deploy** — the
dependencies are intentionally vulnerable and the scripts contain fake secrets.

- `src/server.js` — Express API (imports express, lodash, axios, jsonwebtoken, ejs, handlebars, validator)
- `worker/app.py` — Flask worker (imports flask, requests)
- Several declared dependencies are intentionally **unused** to show reachability de-prioritization.
