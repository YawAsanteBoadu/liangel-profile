# Liangel Beauty Studio — QR Social Landing Page

A single-page, mobile-first landing site that a business QR code points to.
It shows the logo/business name and four buttons linking out to social profiles
(Instagram, Facebook, TikTok, WhatsApp). Plain HTML/CSS/JS — no build step.

```
lbs_profile/
├─ index.html        ← the landing page (deploy this)
├─ generate-qr.js    ← script that creates qr-code.png / qr-code.svg
├─ package.json      ← one dependency: qrcode
├─ img/
│  └─ liangy_logo.PNG← logo (background + header)
├─ qr-code.png       ← generated QR (raster)
└─ qr-code.svg       ← generated QR (vector)
```

---

## 1. Update the four social links

Open **`index.html`** and find the `<!-- ===== SOCIAL LINKS ===== -->` block.
Replace each placeholder `href` with the real profile URL:

| Button    | Placeholder                          | Replace with                     |
|-----------|--------------------------------------|----------------------------------|
| Instagram | `https://instagram.com/yourbusiness` | your Instagram profile URL       |
| Facebook  | `https://facebook.com/yourbusiness`  | your Facebook page URL           |
| TikTok    | `https://tiktok.com/@yourbusiness`   | your TikTok profile URL          |
| WhatsApp  | `https://wa.me/yourphonenumber`      | `https://wa.me/<countrycode+number>` (digits only, no `+` or spaces, e.g. `https://wa.me/60123456789`) |

> **Rebrand the color:** change the single `--accent` value in the `:root`
> block at the top of `index.html`. Everything (buttons, focus rings, theme
> color) follows from it.

---

## 2. Deploy the page

You only need to host `index.html` and the `img/` folder. Pick one:

### Option A — GitHub Pages (step by step)

1. Create a new repository on GitHub (e.g. `liangel-links`).
2. Push these files to it:
   ```bash
   git init
   git add .
   git commit -m "Liangel landing page"
   git branch -M main
   git remote add origin https://github.com/<you>/liangel-links.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select branch **`main`** and folder **`/ (root)`**, then **Save**.
6. Wait ~1 minute. Your URL appears at the top of the Pages screen, e.g.
   `https://<you>.github.io/liangel-links/`.

### Option B — Vercel (step by step)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New → Project**, then import the repository (or drag-and-drop this
   folder using the Vercel CLI: `npx vercel`).
3. Framework preset: **Other**. Build command: leave **empty**.
   Output directory: leave **empty** (it serves `index.html` from the root).
4. Click **Deploy**.
5. After ~30 seconds you get a URL like `https://liangel.vercel.app`.

> Either host serves the site over HTTPS for free — required for the QR code
> and for links to open cleanly on phones.

---

## 3. Regenerate the QR code with the live URL

The repo ships with QR files pointing at a placeholder. Once you know the real
deployed URL from step 2, regenerate them:

```bash
npm install                # first time only — installs the qrcode package
node generate-qr.js "https://liangelbeautystudio.netlify.app/"
```

This overwrites **`qr-code.png`** (print/social) and **`qr-code.svg`** (vector).

- Use the **PNG** for social posts and quick sharing.
- Use the **SVG** for print (business cards, posters, window decals) — it stays
  crisp at any size.

Test the code by scanning it with a phone camera before printing — it should
open your landing page.

---

## Notes

- No backend, database, or analytics — fully static and dependency-free to run.
- `node_modules/` is only needed to *generate* the QR code, not to host the page.
- Respects `prefers-reduced-motion`: the breathing background stills for users
  who ask their device to reduce motion.
