# React MobX Boilerplate
 
A modern web development boilerplate for React + MobX + Webpack2.
## Stack

* React
* MobX
* Webpack 2
* Typescript
* PostCSS + CSS Modules

## Features

* HMR of components and store
* Code-splitting out of the box
* Simple routing (without react-router)
* Server-side rendering with async data loading

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

Typically, when adding a new page you'd add a route for it in `routes.tsx` containing the component to render. Note that the component isn't imported directly but with System.import for code splitting. Then you can add the component to the components folder and the relevant state to the store.

This project is a boilerplate and does not impose strong architectural decisions on users.


## TODO

- [x] Full SSR workflow
- [x] Optimize bundles
- [x] Static assets (images etc.)
- [ ] Make work with remote chrome debugging
- [ ] Add linter
- [ ] Add PostCSS plugins
- [x] Use webpack-dev-middleware instead of webpack-dev-server
