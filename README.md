# Effect Digital - Nuxt 3 Boilerplate

An always work-in-progress boilerplate for Nuxt 3. 🛠️

## Getting Started

1. Add the following to the `.npmrc` file:

```.npmrc
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
@effect-digital:registry=https://npm.pkg.github.com
```

2. Replace `${NPM_TOKEN}` with a GitHub auth token with **read** permissions or go to **1Password** and search for `NPM Read Package (.npmrc)` and copy the token from there.

3. Change your Node version

```bash
# npm
nvm use
```

4. Install the dependencies:

```bash
# npm
npm install
```

5. Start developing on http://localhost:3000

```bash
# npm
npm run dev
```

## NPM Commands

Several of the npm tasks use [npm-run-all](https://github.com/mysticatea/npm-run-all/blob/master/docs/npm-run-all.md) to streamline development and deployment.

1. `npm run dev` - Spins up local site and watches for file changes.
2. `npm run lint` - Runs linting for both styles and scripts.
3. `npm run lint:css` - Runs stylelint against **scss** files.
4. `npm run lint:js` - Runs Eslint against **js/ts/vue** files.
5. `npm run format` - Checks and formats files according to Prettier config.
6. `npm run format:check` - Checks files ONLY according to Prettier config.
7. `npm run format:write` - Formats files ONLY according to Prettier config.

## Local Device Testing

If you wish to test on a device (i.e. a phone), when you start the dev-server with `npm run dev`, a QR code will appear; scan it. Boom, magic development server on a real device (on the same network). Alternatively, ping the `Network` URL/IP address to a different device (again, on the same network).

## Hosting

Hosting for new Nuxt 3 sites is on [Netlify](https://app.netlify.com/teams/effect-digital/overview) (unless otherwise stated).

Check the site builds locally to replicate any issues:

```bash
npm run build
```

There is a `netlify.toml` config file for quick Netlify setup.

## Atomic Design principles

The structure of this boilerplate is designed around [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) principles, following the approach of Atoms, Molecules and Organisms.

This is evidenced in both the `/components` and `/assets/scss` directories.

## Modular Content

#### Alias for Modular Content Blocks directory: `@blocks/`

e.g. `import PlaceholderComponent from '@blocks/PlaceholderComponent'`.
_See `nuxt.config.ts`_

This boilerplate is set up to use custom Modular Content with any CMS that supports modular content/flexible content/blocks etc.

Using the component `/components/organisms/ModularContent` you should be able to grab the relevant modular content field from your CMS and loop over it, using components from `components/organisms/_modular-content-blocks/[ComponentName].vue` (the `_` at the start is to keep it at the top of the directory and allow the other directories to sit in order)

Visit `composables/useModularContentUtils.js` to define your components.

There is a `KitchenSink` component and `PlaceholderComponent` component that can be deleted.

The `MissingBlock` component is good for local debugging, so it is advised to keep that; it will not show on production.

## Components

Components do not require the full path to use (e.g. `<atoms-single-picture />`), as this is overridden inside the `nuxt.config.ts` - instead, you can use just the filename (e.g. `<single-picture />`).

Each component inside `/components` **must** be named uniquely and with multi-words to follow [Vue's best practice](https://vuejs.org/style-guide/rules-essential#use-multi-word-component-names).

This also means components can be moved between directories easily (for example if an Atom grows too big and becomes a Molecule) without having to change any references anywhere else.

## Pinia

Pinia is installed by default, and has a `ui` store set up for the mobile navigation.

## Other Packages

### Marker.io

Marker.io is set up as a plugin and called from `app.vue` - control it via the `.env` file to turn it on and change the Marker.io ID.

This limits loading it unless the `.env` is `true` which improves page speed. Good to enable on branches/PRs, and disable on `production`.

### Cookieyes

Cookieyes is a less intrusive version of CookieBot, and can run a single website per account. It is set up as a plugin, and can be enabled by simply adding the ID to the `.env` file.

## SEO

There are three packages already installed but not activated; enable any of them by uncommenting them in `nuxt.config.ts`:

| Tool               | Plugin Name           | Details                                                                                                                                                                                                                                                                      |
| ------------------ | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Robots             | `@nuxtjs/robots`      | Generic `robots.txt` generated                                                                                                                                                                                                                                               |
| Google Tag Manager | `nuxt-gtag`           | Runs against an `.env` variable of `NUXT_PUBLIC_GTAG_ID`                                                                                                                                                                                                                     |
| Sitemap            | `nuxt-simple-sitemap` | Requires `site.url` config - best to use an `.env` variable. Also runs against a custom API found in `/server/api/sitemap/urls.js` - this file should be used to grab all relevant pages from your CMS and return them. The file has an example taken from a Contentful CMS. |

## Custom Composables

There is a compsable for Modular Content. Otherwise, please use ['@effect-digital/vue-utils'](https://github.com/effect-digital/vue-utils) for other composables.

### Usage of custom composables

Visit `/components/organisms/_modular-content-blocks/KitchenSink.vue` for examples on how to use them.

## Deployment

1. Raise a PR of your branch against `develop`.
2. Once your PR is approved, merge it in to `develop`.
3. Open the ['Actions'](https://github.com/effect-digital/nuxt3-boilerplate/actions) tab in GitHub - you should see an action running for 'Release Drafter' - this will automate and update the [current draft release](https://github.com/effect-digital/nuxt3-boilerplate/releases). The target branch for this release is `develop`.
4. On a deployment day only (unless authorised by Christian), edit the current draft release, then click 'Publish Release'.
5. On publishing, the automations will run and the website will begin to deploy.
6. Once deployed, check the site is working as expected.

### Post-live

1. When you are happy everything is running, on your local computer, checkout `develop` and `git pull`.
2. Checkout `main` and `git pull`.
3. Do `git rebase develop` (on `main` branch) to bring `main` inline with `develop`.

### Netlify

> [!IMPORTANT]
> Make sure to set an `NPM_TOKEN` variable under `Environment variables` by generating a **GitHub classic personal access token** under the **Effect Dev** account with read scopes.

## Recommended Extensions

### Visual Code

Recommended extensions have been added under `.vscode` -> `extensions.json` and can be added in several ways.

1. By going to **Extensions** in Visual Code and adding any recommended extensions which match the list under `extensions.json`.
2. Alternatively copying and pasting the extension names from `extensions.json` into the **Extensions** search bar to locate and install a recommended package.
