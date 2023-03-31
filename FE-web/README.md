# web-ecom

## Prerequisite
- [Node.js v14](https://nodejs.org/en/)
- [npm v7](https://github.blog/2021-02-02-npm-7-is-now-generally-available/)

## Get Started

```bash
npm install
npm run dev
```

## Available Scripts

In the project directory, you can run:

### Runs the app in the development mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Run tests

```bash
npm test
```

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Build

To builds the app for production to the `.next` folder, run:

```bash
npm run build
```

The build is minified and the filenames include the hashes.

### Deploy

Along with the `.next` folder, _all_ these files and folders are needed to run this application:

```
.next/
src/pages/
public/
locales/
package.json
package-lock.json
next.config.js
i18n.js
```

Copy above files/folders to a new folder, e.g. `build`:

```bash
mkdir build
cp package.json package-lock.json next.config.js i18n.js .next src/pages public locales ./build
```

Install dependencies:

```bash
npm ci --production
```

To run the production build:

```bash
npm start
```

See the section about [deployment](https://nextjs.org/docs/deployment#other-hosting-options) for more information.

## Environments
(TODO)
Add environment variables to either `serverRuntimeConfig` or `publicRuntimeConfig` inside `next.config.js`, and `src/constants/config.ts`.

## Accessibility
Please install [WAVE Evaluation Tool](https://www.accessibility-developer-guide.com/setup/browsers/chrome/wave-toolbar/) to check for basic accessibility rules in every page.
Do not leave any red errors, and try to keep yellow warnings to a minimum.

## Styleguide

- File name convention should be `kebab-case`. So `<TextField>` component should be named as `text-field.tsx`.
- Use named export unless necessary (such as when you want to do lazy loading). Read [here][stop-export-default] for explanation.
- Prefer absolute import unless you"re importing files within same modules.

[nextjs]: https://nextjs.org/
[stop-export-default]: https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/
