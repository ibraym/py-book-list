# ui module

## Description

This is a client UI

## Versioning

If you make changes in this package, please do following:

- After not important changes (typos, bug fixes, refactoring) do: `npm version patch`
- After adding new features do: `npm version minor`
- After significant UI redesign do: `npm version major`

## Commands

- Installing dependencies:

```bash
cd npm ci
```

- Running development UI server with autorebuild on change

```bash
npm start
```

- Building the module from sources in the `dist` directory:

```bash
npm run build
npm run build -- --mode=development     # without a minification
```
