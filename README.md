# Duc's very ordinary homepage

A small personal website in plain HTML, CSS, and JavaScript. System fonts,
blue links, a light background, and a table-like sidebar. No framework,
package manager, compilation, remote fonts, analytics, or content fetched by JavaScript.

The four public pages contain education, publications, awards, and relevant
experience from the supplied CV. The skills and projects sections were omitted.
Publication statuses, author spellings, and employment dates follow the CV,
even where the older website differs. “Present” and “third-year” are editable
text, not automatically calculated. Photos are placeholders.

## Quick start

1. Unzip this package into a temporary folder.
2. Open `index.html` in a browser. Everything works directly from disk.
3. Replace the image placeholders and edit any text you want.
4. If retaining the old website, complete the migration below **before replacing
   files in your existing repository**.
5. Copy the **contents** of this package's `duc-homepage/` folder into the
   publishing root of `ducdonghiem/ducdonghiem.github.io`. Do not put an extra
   `duc-homepage/` directory around the site. Include the empty `.nojekyll` file.
6. Commit and push, then select the publishing branch and `/(root)` in GitHub
   Settings → Pages. Use the branch you actually pushed to.

For an optional local server, run this from the site folder:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000/>. Python is only a preview convenience; the deployed
site has no Python dependency. Stop the preview with Ctrl+C.

## Files and where to edit

| File or folder | Purpose |
| --- | --- |
| `index.html` | Bio, profile photo, contact links, two photographs |
| `education.html` | Degree, dates, GPA, campus activities |
| `publications.html` | Papers, conference abstracts, scholarships and awards |
| `experience.html` | Five research/work positions |
| `secret.html` | Secret meme page |
| `404.html` | Missing-page message |
| `assets/css/style.css` | Shared appearance and small-screen layout |
| `assets/js/site.js` | Profile-photo swap and Konami code |
| `assets/images/` | Profile, cursed profile, secret meme, construction badge |
| `assets/images/photos/` | Caption-free photo placeholders `01.svg`–`05.svg` |
| `assets/docs/Resume.pdf` | Unchanged copy of the supplied CV; replace to update |
| `resume/index.html` | Working temporary CV landing page; replace with the old site's static export |
| `.nojekyll` | Tells GitHub Pages to publish the files without Jekyll processing |

Every page contains its own header and navigation so there is nothing to build
and navigation still works without JavaScript. If changing the site title or
navigation, edit all four public pages. Keep exactly one `aria-current="page"`
attribute in each page's navigation, on that page's link. Update the footer's
visible date and its `<time datetime="YYYY-MM-DD">` value when appropriate.

Edit HTML directly; there is no hidden generated copy or data file to maintain.
Adding a publication means copying an existing `<li>` block. Adding a job means
copying a `<section class="experience-entry">` block. Avoid inserting a new
skills or projects section unless you decide you want one later.

## Put your images in the repo

Keep ordinary photos as JPG or WebP, and use PNG if transparency is useful.
The supplied SVGs are intentionally simple placeholders, not your photographs.
Use lowercase filenames without spaces, and forward slashes in HTML paths.
GitHub Pages filenames are case-sensitive.

| Placeholder | Used on |
| --- | --- |
| `assets/images/profile.svg` | Home profile photo |
| `assets/images/profile-cursed.svg` | Brief hover replacement |
| `assets/images/photos/01.svg`, `02.svg` | Home |
| `assets/images/photos/03.svg` | Education |
| `assets/images/photos/04.svg` | Publications & Awards |
| `assets/images/photos/05.svg` | Relevant Experience |
| `assets/images/secret.svg` | Secret page |

For example, add `assets/images/profile.jpg` and `profile-cursed.jpg`, then edit
the image in `index.html`:

```html
<img id="profile-photo" src="assets/images/profile.jpg"
     data-cursed="assets/images/profile-cursed.jpg"
     width="154" height="192" alt="Duc Do">
```

The profile frame uses `object-fit: contain` so your face is not cropped. A
portrait around 4:5 fits well. Match the normal and cursed image dimensions to
keep the swap visually consistent. Resize photographs to around 1,200 pixels
on the long side before committing if convenient.

For a random photo, replace its `src` and its `width`/`height` with your actual
image and dimensions. Those attributes reserve space; CSS controls displayed
size. Leave `alt=""` for purely decorative photos. There are no visible captions.

```html
<div class="photo-strip">
  <img src="assets/images/photos/river.jpg" width="1200" height="800"
       alt="" loading="lazy">
</div>
```

You can move or duplicate that block between paragraphs or job entries. Add
`class="wide"` to an image for a slightly larger display. Nothing is randomly
loaded at runtime; you choose the placement yourself.

## Move the existing website to /resume/

The desired final URLs are:

- Personal homepage: <https://ducdonghiem.github.io/>
- Old résumé website: <https://ducdonghiem.github.io/resume/>
- Secret page: <https://ducdonghiem.github.io/secret.html>

This is one repository and one GitHub Pages site. `resume/index.html` creates
the `/resume/` address; you do not need a second repository, DNS entry, or
redirect service.

**What I inspected on October 5, 2026:** the default branch is `gh-pages`, but
the customized résumé is on `main`. Both branches contain Jekyll source. The
root `index.html` is only front matter selecting `layout: resume`, not a
standalone HTML page. The existing `CNAME` contains the template author's
domain `resume-template.joelglovier.com`. Check your current Settings → Pages
publishing source rather than assuming the default branch is the deployed one.

### Recommended: export the old page once, then keep everything static

Do this before copying the new homepage over the old root. The export needs
Ruby and Bundler because the **old** site uses Jekyll. The new website does not
need them at any point. If your local old site has newer changes, commit them
first and use that branch's HEAD for the backup instead of the commands below.

1. Back up the current repository and record its current Pages settings. In a
   clean local checkout, preserve `main` in a tag and a separate working folder:

   ```sh
   git switch main
   git pull --ff-only
   git tag before-retro-homepage
   git worktree add --detach ../duc-resume-source HEAD
   ```

   If that tag already exists, choose a new tag name. The worktree is a sibling
   folder, not a directory inside the published site. These commands do not
   publish anything.

2. In `../duc-resume-source/_config.yml`, set the following top-level values
   (edit existing values if present):

   ```yaml
   url: "https://ducdonghiem.github.io"
   baseurl: "/resume"
   ```

   In `_layouts/resume.html`, change the existing avatar path from
   `images\avatar-ai.jpg` to `images/avatar-ai.jpg`. Browser URL paths use `/`.

   The inspected `_includes/head.html` already uses relative links
   `css/main.css` and `favicon.png`, which resolve inside `/resume/`. Check any
   newer custom links too: a local `/images/file.jpg` or `/css/main.css` path
   needs to become `images/file.jpg` or `css/main.css`, or explicitly start with
   `/resume/`. Leave external URLs, `mailto:` links, and in-page `#anchors` alone.

3. Export the old site from that sibling working folder:

   ```sh
   cd ../duc-resume-source
   bundle install
   bundle exec jekyll build --baseurl /resume --destination ../duc-resume-export
   ```

   The existing Gemfile supplies the `github-pages` gem. If your computer has
   never built Jekyll, install a compatible Ruby and Bundler first using the
   [Jekyll installation guide](https://jekyllrb.com/docs/installation/).
   Do not run the export against the new package containing `.nojekyll`.

4. Inspect `../duc-resume-export/index.html`. It should be a complete HTML
   document with your rendered résumé, not Liquid syntax such as `{{ ... }}`
   or `{% ... %}`. Confirm `css/main.css`, images, and the favicon were exported.
   Remove the exported `CNAME` if present. Retain license/attribution files from
   the old template where required by its license.

5. Return to your original repository. Optionally create a branch named
   `retro-homepage` for the change. Copy the new package contents into its root,
   then replace the package's entire `resume/` directory with the **contents**
   of `../duc-resume-export/`:

   ```text
   repository root / resume / index.html
   repository root / resume / css / main.css
   repository root / resume / images / ...
   repository root / resume / favicon.png
   ```

   Do not nest the export as `resume/duc-resume-export/`. The bundled
   `resume/index.html` is only a working CV landing page; it is **not** an
   archived copy of your previous website.

6. Once the export works, remove the old Jekyll source from the new publishing
   root: `_config.yml`, `_layouts/`, `_includes/`, `_data/`, `_sass/`, `_assets/`,
   the old root `css/` and `images/`, Gemfiles, and any obsolete Docker/Travis
   files. They remain recoverable from the backup tag. Keep `.git/`, your
   original `LICENSE`, the new `assets/`, and the exported `resume/`. Merge
   useful existing `.gitignore` entries with the supplied ones. Inspect existing
   GitHub Actions workflows and disable any custom old-site workflow that would
   regenerate or overwrite your new publishing branch.

7. For the requested `github.io` URL, remove the old root `CNAME` containing
   `resume-template.joelglovier.com`. In Settings → Pages, clear the Custom
   domain if it contains that template domain. Do not retain it accidentally.
   If you later choose your own custom domain, configure that intentionally.

8. Preview from the original repository root with `python3 -m http.server 8000`.
   Check `/`, `/education.html`, `/publications.html`, `/experience.html`,
   `/resume/`, and `/secret.html`. In particular, the résumé's photo and CSS
   should load from `/resume/images/` and `/resume/css/`.

9. Commit and push your chosen branch, then configure Pages to deploy it from
   `/(root)` as described below. If using `retro-homepage` just for review,
   merge it into `main` and choose `main` as the publishing branch.

This freezes the old site's current appearance and content. To update it later,
edit its exported HTML directly or rebuild the preserved Jekyll source and
replace the export. Editing old `_data` files cannot change a static export.

### If you skip the export

The included `/resume/` landing page already works and links to the real CV PDF.
Keep it if that is enough. It will not reproduce the old résumé site's design.
You can replace it with the export later.

## GitHub Pages settings

After reviewing your local changes:

```sh
git add .
git commit -m "Add plain personal homepage and resume archive"
git push origin main
```

That example assumes your completed changes are on `main`. Substitute your
actual branch if you chose a different publishing branch.

In <https://github.com/ducdonghiem/ducdonghiem.github.io/settings/pages>:

1. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
2. Select **main** (or your chosen publishing branch) and **/(root)**, then Save.
3. Leave Custom domain empty for the requested `ducdonghiem.github.io` URL.
4. Wait for the Pages deployment to finish before checking the live page.

GitHub runs its own Pages deployment machinery, but you do not need to create
an Actions workflow or install anything for this static site. `.nojekyll`
prevents Jekyll from treating the new files as templates.

Official references:

- [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

## Easter eggs (owner notes)

- **One Rickroll:** the Home page's “Download CV” link opens Rick Astley's
  YouTube video. It is a plain link, so it also works without JavaScript. It
  does not autoplay or download anything. The Publications page's “CV (PDF)”
  and the `/resume/` landing page link to the actual supplied PDF. To retire the
  prank, change the Home link to `assets/docs/Resume.pdf`.
- **Secret page:** `/secret.html` displays a local, replaceable SVG computer
  meme. The tiny period at the end of the Home footer links there. The page
  asks crawlers not to index it; it is still a public page, not private storage.
- **Profile hover:** after 220 ms, the image changes to the cursed version for
  650 ms, then restores. Moving away restores it immediately. Touch input and
  the reduced-motion preference skip the swap. Missing cursed assets are
  ignored. Change the filenames in `index.html`, or set `portrait: false` in
  `assets/js/site.js` to disable it.
- **Konami code:** press ↑ ↑ ↓ ↓ ← → ← → B A on any of the four public pages
  or the secret page. A native browser alert says “Achievement unlocked: +30
  lives. Your GPA remains unchanged.” B/A are case-insensitive. There must be
  less than eight seconds between keys. Typing in input fields is ignored.
  Set `konami: false` to disable it.
- **Construction badge:** a tiny local GIF blinks a small dot on the Home
  footer. With reduced motion enabled it uses a static SVG. Delete the
  `<picture>` block to remove it.
- **Visitor counter:** deliberately fake text. No visitors are tracked.

The site does not require external services to render. External contact,
publication, and Rickroll links naturally require internet access when opened.

## Maintenance and troubleshooting

- **Nothing changed live:** verify that you pushed the branch selected in
  Settings → Pages, check the Pages deployment under Actions, and then hard
  refresh. A commit on `main` does not update a site publishing from `gh-pages`.
- **Old site replaced your new page:** check for an existing custom deployment
  workflow that rebuilds Jekyll and writes to the publishing branch.
- **Broken photo:** check filename case, extension, and `/` separators. Changing
  a file from `.svg` to `.jpg` also requires changing its HTML `src`.
- **New page shows in a subfolder:** copy the contents of `duc-homepage/` into
  the publishing root, not the wrapper folder itself.
- **Old résumé has no style/photo:** copy all exported assets under `resume/`
  and fix local links that point to the old root. Do not simply move the old
  22-byte Jekyll `index.html` into `resume/`.
- **CV update:** replace `assets/docs/Resume.pdf` and update the HTML separately.
  The pages do not parse the PDF or synchronize automatically. The supplied
  PDF includes its original skills and projects; those were omitted only from
  the new HTML pages. Edit or replace the PDF if you want to omit them there too.
- **Rollback:** use the backup tag or your original branch to recover the old
  source, and restore the original Pages settings if changing publishing
  branches. Review a rollback locally before publishing it.

Before each push, open all four pages, follow local links, check photos and the
real PDF, and inspect a narrow browser window. No automated tooling is needed
for normal maintenance.

## Checks completed for this package

All local HTML links, image paths, and fragment anchors were checked. Active
navigation links match their pages, `.nojekyll` is present, and the included
PDF is byte-identical to the supplied CV. JavaScript syntax and isolated
behavior checks passed for the timed image swap, early restoration, touch and
reduced-motion handling, a missing cursed image, and the Konami popup.

A browser preview could not run in the authoring environment because the
browser download failed. Those isolated checks do not verify browser rendering;
preview desktop and narrow windows locally before publishing. The legacy
Jekyll export must also be checked after you produce it from your local source.
