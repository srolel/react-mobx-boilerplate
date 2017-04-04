/*
    * webpack does static analysis over `require` and `System.import` calls to either add modules
    * to the chunk (`require`) or split them into separate chunks (`System.import`).
    * in development, we use `require` for HMR to work.
    */
let routes: { route: string, fn: (cb: (componentClass: React.ComponentClass<any>) => void) => void }[];
if (__DEVELOPMENT__) {
    const getRoute = mod => cb => cb(mod.default)
    routes = [{
        route: '/users',
        fn: getRoute(require('./components/Users'))
    }, {
        route: '/about',
        fn: getRoute(require('./components/About'))
    }, {
        route: '/',
        fn: getRoute(require('./components/Home'))
    }];
} else {
    const getRoute = p => cb => p.then(mod => cb(mod.default));
    routes = [{
        route: '/users',
        fn: getRoute(System.import('./components/Users'))
    }, {
        route: '/about',
        fn: getRoute(System.import('./components/About'))
    }, {
        route: '/',
        fn: getRoute(System.import('./components/Home'))
    }];
}

export default routes;