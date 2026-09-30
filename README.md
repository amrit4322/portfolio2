# Amritjot Singh — interactive React portfolio

React + Vite. Static hosting, no backend or API key required.

## Start locally

Use Node.js 22.12 or later in the Node 22 series (or a compatible newer release).

```bash
npm install
npm run dev
```

Open the address printed in Terminal. To check the production build:

```bash
npm run build
npm run preview
```

## Where to edit

| File | Purpose |
| --- | --- |
| `src/data/portfolio.json` | Your profile, projects, repositories, experience, skills, recognition and page copy |
| `src/App.jsx` | Page sections and interactive behavior |
| `src/components/ui.jsx` | Reusable icons, links, reveal effects, tags and project dialog |
| `src/hooks/usePortfolio.js` | Theme, motion settings, scroll progress and active navigation |
| `src/styles.css` | Theme tokens, layouts, responsive styles and animation |
| `public/` | Portrait, resume and any additional static files |
| `index.html` | Browser title, description, favicon and theme-color metadata |

## Add an experience

Add an object to the `experience` array in `src/data/portfolio.json`.
The array order determines the timeline order. No component or CSS changes are needed.
Replace this example's placeholder text with your actual experience:

```json
{
  "id": "unique-role-id",
  "date": "2027 — present",
  "title": "Your role · Company",
  "description": "A short overview of the role.",
  "details": ["A concrete contribution.", "A verified result or responsibility."],
  "tags": ["Python", "SQL"]
}
```

## Add skills or categories

Add a string to an existing `skillGroups` entry's `items` array, or add a whole group:

```json
{
  "id": "unique-category-id",
  "title": "Your category",
  "items": ["Technology one", "Technology two"]
}
```

Search, category options, counts and layout update automatically. Visitors can
select one or more skills. For multiple selections, **All selected skills** finds
work using every selected skill; **Any selected skill** finds work using at least
one. The results come from the explicit `skills` arrays on projects and
repositories. If nothing is linked, the site says so.

## Add a project

Add an object to `projects`:

```json
{
  "id": "unique-project-id",
  "title": "Project name",
  "category": "Short category",
  "focus": "Software",
  "description": "The problem, your contribution and the result.",
  "tags": ["React", "Python"],
  "skills": ["React", "Python"],
  "highlights": ["A useful detail for the project dialog."],
  "url": "https://github.com/YOUR_USERNAME/YOUR_REPOSITORY"
}
```

Project numbering and filter options are generated automatically, including new
`focus` values. `tags` are visible on the card; `skills` drive the skill explorer
and must match names in `skillGroups[].items` exactly. Add the technologies you
actually used. You can also add `skills` to a repository entry. `highlights`,
`url`, and `badge` are optional. No placeholder source link appears when `url`
is omitted. JSON requires double quotes and does not allow comments or trailing
commas.

## Other content

- `profile`: name, contact links, portrait/resume filenames, intro and availability.
- `specialties`: hero focus choices, descriptions and floating technology labels.
  `projectFocus` should exactly match a project's `focus` value.
- `repositories`: source cards with `id`, `name`, `type`, `description`, `url`, and `tags`.
- `highlights`: recognition cards with `id`, `title`, `subtitle`, and `description`.
- `content`: section headings, about paragraphs and contact topics.

IDs must be unique inside each array. Use plain strings for text. Asset filenames
in `profile` are relative to `public/` (no `public/` prefix or leading slash).
Links to files are built using Vite's base URL, so repository subpaths work too.

## Change the visual style

Edit the CSS variables at the top of `src/styles.css`. There are dark and light
palettes. Colors, borders, surfaces and text inherit those tokens. The theme and
motion preferences are stored only in the visitor's browser. The operating
system's reduced-motion preference takes priority over animation controls.

Interactions support keyboard use: focus tabs and skills are buttons, experiences
use native disclosure controls, and project dialogs support Escape and return
focus to the control that opened them. Content does not require hover to access.

## Update your existing portfolio2 repository

This release changes the source structure. Copy **the whole `src/` folder** into
your repository, replacing the previous source. Keep your existing public files
and GitHub Pages configuration. Commit and push:

```bash
git add src README.md
git commit -m "Add interactive portfolio and editable content data"
git push
```

Your existing Pages workflow will build `dist/` and publish automatically. You
only need to copy the entire project if you are starting from a fresh folder.

## GitHub Pages setup for a new repository

A workflow is included at `.github/workflows/deploy.yml`. Enable Settings → Pages
→ Source → GitHub Actions. Its default build is configured for a root URL such
as your custom domain `amritjot.in`.

For a temporary repository URL such as `USERNAME.github.io/portfolio2/`, change
the workflow's build step to:

```yaml
run: npm run build -- --base=/portfolio2/
```

For the custom domain, use `npm run build` again. The public assets in this version
follow the selected base automatically. Configure the domain and DNS in GitHub
and Hostinger separately; editing content does not require any DNS changes.

## Notes

The site displays curated content, not live GitHub statistics or a backend chat.
The email control opens the visitor's email app with a subject; it does not submit
a hidden form. Never commit credentials or place secrets in client-side code.
