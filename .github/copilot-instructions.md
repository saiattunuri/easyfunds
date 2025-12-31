# Copilot instructions for EasyFunds static site

Purpose: help AI coding agents be immediately productive editing this small static website.

**Big Picture**
- **Type**: Simple multipage static site (no backend). Core pages: `index.html`, `accounts.html`, `loans.html`, `support.html`.
- **Assets**: styles in `css/style.css`, client JS in `js/script.js`.
- **Why structure**: pages are duplicated HTML (manual nav/header/footer). There is no build step or bundler; changes are applied directly to files and deployed as static assets.

**Key integration points**
- Genesys chat stub lives inline in `index.html` (head). It loads an external script and uses a `deploymentId` — avoid changing this unless instructed. The site calls `Genesys("command","Launcher.show")` from `js/script.js` via `openLauncher()`.
- There are no server-side APIs in the repo. Forms (`loans.html`, `support.html`) are handled entirely client-side by `js/script.js` (they update `#loanStatus` and `#supportStatus` only).

**Developer workflows (what actually works here)**
- Local preview: serve the folder with a local HTTP server and open `http://localhost:8000`.
  - Python (recommended if installed): `python -m http.server 8000 --directory .`
  - Node (if you prefer): `npx http-server -p 8000`
- Editing pages: update the HTML files directly. The navigation header is duplicated — update `nav` in each page when adding links.
- Deploy: copy the files to your static host (e.g., S3, Netlify, GitHub Pages). There is no CI config in the repo.

**Project-specific patterns & conventions**
- Keep interactive logic in `js/script.js`. Functions of interest:
  - `applyLoan(event)` → used by the `onsubmit` in `loans.html` (updates `#loanStatus`).
  - `sendMessage(event)` → used by the `onsubmit` in `support.html` (updates `#supportStatus`).
  - `openLauncher()` → triggers the Genesys launcher; connected to the chat button in `index.html` footer.
- Place non-inline scripts at `js/script.js` and include with `<script src="js/script.js"></script>` before `</body>` on pages that need them.
- Keep visual changes in `css/style.css` (single stylesheet referenced from all pages).

**When making changes, follow these concrete rules**
- Don't remove or alter the Genesys bootstrap snippet in `index.html` unless the change is explicitly requested — it's the live chat integration.
- If you add a new page, add the same `nav` entries to every page to keep the site consistent.
- For new client behavior, add functions to `js/script.js` and reference them with `onsubmit` or event listeners; prefer adding the `<script src="js/script.js"></script>` include at the bottom of the page.
- Forms are intentionally client-only here. If you introduce a backend or third-party endpoint, document the endpoint and update the README.

**Examples (copy-pasteable)**
- To mark loan submission success: `document.getElementById("loanStatus").innerText = "Loan application submitted.";` (used in `loans.html`).
- To show chat launcher (used by footer button in `index.html`): `openLauncher()` which calls `Genesys("command","Launcher.show")` (defined in `js/script.js`).

If anything above is unclear or you want more specific automation (e.g., add a build step, centralize nav into an include), tell me which area to expand and I'll update this file.
