# A react boilerplate project featuring webpack 2, HMR, code splitting, mobx, SSR

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

## TODO

- [ ] Full SSR workflow
