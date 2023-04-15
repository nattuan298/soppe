# web-dashboard

## Prerequisite
- [Node.js v14](https://nodejs.org/en/)
- [npm v7](https://github.blog/2021-02-02-npm-7-is-now-generally-available/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Environments
(TODO)

## Accessibility
Please install [WAVE Evaluation Tool](https://www.accessibility-developer-guide.com/setup/browsers/chrome/wave-toolbar/) to check for basic accessibility rules in every page.
Do not leave any red errors, and try to keep yellow warnings to a minimum.

## Styleguide

- File name convention should be `kebab-case`. So `<TextField>` component should be named as `text-field.tsx`.
- Use named export unless necessary (such as when you want to do lazy loading). Read [here][stop-export-default] for explanation.
- Prefer absolute import unless you"re importing files within same modules.

[nextjs]: https://nextjs.org/
[stop-export-default]: https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/
