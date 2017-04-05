# A react boilerplate project featuring webpack 2, HMR, code splitting, mobx, SSR

## Structure

During app development, you should care about these files:

```
react-mobx-boilerplate/
└───src/
    │
    └───components/
    |     Core.tsx
    |     ...
    |
    └───stores/
    |     AppState.ts
    |
    └───routes.tsx
```

The rest can be extended if needed:

1. `index.html`
1. `index.ts` - Entry point for browser bundle
1. `index.node.ts` - Entry point for node (server-side rendering) bundle
1. `App.ts` - Manages routing, contains a reference to AppState
1. `root.tsx` - Container component for the app
1. `webpack/webpack-dev-server.js` - Script to run the development server
1. `webpack/webpack.config.js` - Webpack configuration for browser bundle
1. `webpack/webpack.config.node.js` - Webpack configuration for node (server-side rendering) bundle

## Installation and Starting

### Development server
```
yarn
yarn start
> visit localhost:3000
```

### Building for production
```
yarn run build
> serve index.html
```

### Building for node (server-side rendering)
```
yarn run build-node
> require('build/app.node.js').default('/users')
```

## Stack

* React
* Mobx
* Webpack 2
* Typescript
* PostCSS + CSS Modules

## Features

* HMR of components and store
* Code-splitting
* Simple routing (without react-router)
* Server-side rendering with async data loading
* Works with remote chrome debugging (vscode launch.json included)

## TODO

- [x] Full SSR workflow
- [x] Optimize bundles
