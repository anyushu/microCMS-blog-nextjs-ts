# microCMS x NextJSJamstack Blog

## Getting Started

1. create `.env.local`

```dotenv
NEXT_PUBLIC_SITE_NAME="[your sitename]"
NEXT_PUBLIC_SITE_URL="[http://{domain}.com]"

NEXT_PUBLIC_GTM_ID="{GTM-xxxxxxxx}"

NEXT_PUBLIC_GITHUB_URL="[your github profile url]"
NEXT_PUBLIC_TWITTER_URL="[your twitter profile url]"

MICRO_CMS_API_KEY="[microCMS API key]"
MICRO_CMS_SERVICE_DOMAIN="[microCMS service domain]"
```

2. run the development server

```bash
# Install dependencies
yarn install

# Start dev server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Installed Packages

- [Next.js](https://nextjs.org/)
- [Next SEO](https://github.com/garmeeh/next-seo#readme)
- [Next SiteMap](https://github.com/iamvishnusankar/next-sitemap)
- [Typescript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [husky](https://typicode.github.io/husky/#/)
- [lint-staged](https://github.com/okonet/lint-staged#readme)
- [Prettier](https://prettier.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://anyushu.github.io/microCMS-blog-nextjs-ts/storybook/)

## Project Structure

```md
app
├─ .husky
├─ .vscode
├─ public
├─ src
│ ├─ components
│ │ ├─ atoms
│ │ ├─ molecules
│ │ ├─ organisms
│ │ └─ templates
│ ├─ lib
│ ├─ types
│ ├─ pages
│ ├─ styles
│ ├─ util
│ └─ next-seo.config.ts
├─ .eslintrc.json
├─ .prettierrc.json
├─ lint-staged.config.js
├─ next-env.d.ts
├─ next-sitemap.js
├─ next.config.js
├─ postcss.config.js
├─ tailwind.config.js
├─ tsconfig.json
└─ yarn.lock
```
