# Md. Shadikulla Sarker — Personal Website

A single-page personal website (Bengali/English) with a soft-green nature theme.

## Files
- `index.html` — all page content and structure
- `style.css` — all styling, colors, animations
- `script.js` — dark/light mode, language switch, animations, search, visitor counter
- `assets/` — put your **s.jpg** and **PROFILE.pdf** here

## What to personalize before publishing

| Section | What to edit in `index.html` |
|---|---|
| Photo | Add `s.jpg` |
| CV | Add `assets/PROFILE.pdf` |
| About | Replace bracketed text `[...]` in the About section with your own words |
| Education | Fill in university/college/school names, GPA/CGPA, years |
| Skills % | Change `data-percent="70"` and the visible `70%` on each `.skill-bar` |
| Certificates | Duplicate `.cert-card` blocks and fill in real titles |
| Projects | Duplicate `.project-card` blocks and fill in real project info |
| Contact | Replace `shadikulla2459@gmail.com`, phone number, and social links |
| Visitor counter | The counter uses the free CountAPI service with the key `shadikulla-sarker-portfolio`. Change the namespace in `script.js` if you want a fresh count. |

Search for `[` in `index.html` to quickly find every placeholder left to fill in.

## Features included
🌿 Hero with photo, name, role, profile summary, Download CV + Contact Me buttons · 👤 About with career goal & interests · 🎓 Education timeline · 📚 Courses grid · 💻 Technical + Soft skills with animated progress bars · 📜 Certificates · 🔬 Projects · 📞 Contact info + working contact form (mailto) · 🌙 Dark/Light mode toggle · 🌍 Animated rotating Earth · 🌿 Floating leaf animation · 💧 Water ripple effect (about section + buttons) · 🌱 Growing tree animation (hero) · 📈 Visitor counter · 📊 Skills progress bars · ⏳ Timeline · 🏅 Achievement counters · 🔍 Search · 🌐 বাংলা/English language switch · 📱 Responsive design.

## How to publish on GitHub Pages (free)
1. Create a new GitHub repository, e.g. `shadikulla-portfolio`.
2. Upload `index.html`, `style.css`, `script.js`, and the `assets/` folder (with your real photo + CV inside) to the repo.
3. Go to the repo's **Settings → Pages**.
4. Under "Branch", choose `main` and `/ (root)`, then Save.
5. After a minute, your site will be live at `https://your-username.github.io/shadikulla-portfolio/`.

You can also just open `index.html` directly in a browser to preview it locally before publishing.

## Notes
- The contact form uses `mailto:` (opens the visitor's email app) since GitHub Pages can't run a backend. For a form that sends without opening email, connect it to a free service like Formspree and update the `<form>` action in `index.html`.
- The visitor counter needs internet access to the CountAPI service; if it's ever unreachable, it silently falls back to a local per-browser count.
