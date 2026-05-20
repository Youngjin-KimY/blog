# Writing Blog

Personal blog rebuilt with `SvelteKit`, `TypeScript`, and `Node LTS`.

## Stack

- `SvelteKit`
- `TypeScript`
- static output via `@sveltejs/adapter-static`
- markdown rendered through a TypeScript content pipeline
- GitHub Pages deployment via GitHub Actions

## Scripts

```bash
npm install
npm run dev
npm run check
npm run build
```

## Content Layout

```text
content/
  pages/
  posts/
static/
  CNAME
  ads.txt
  google160a50707d398269.html
  favicon.ico
  avatar.jpeg
  bg.jpeg
  thumbnail.png
  images/
```

## Notes

- Posts are sorted by written date descending.
- Old Jekyll-only markdown artifacts are normalized in the TypeScript loader.
- Legacy date-based post URLs are preserved alongside the new `/posts/[slug]/` routes.
