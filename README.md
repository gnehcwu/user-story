# \<user-story>

A stories webcomponent with friendly navigation.

Follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

https://user-images.githubusercontent.com/5228723/120627725-dafcca00-c45b-11eb-9819-420640a4c28b.mp4

## Installation

```bash
npm i user-story
```

## Usage

```html
<script type="module">
  import 'user-story/user-story.js';
</script>

<user-story .stories="${stories}"></user-story>
```

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

## Linting with ESLint, Prettier, and Types

To scan the project for linting errors, run

```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well

```bash
npm run lint:eslint
```

```bash
npm run lint:prettier
```

To automatically fix many linting errors, run

```bash
npm run format
```

You can format using ESLint and Prettier individually as well

```bash
npm run format:eslint
```

```bash
npm run format:prettier
```
