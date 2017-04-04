/*
    * webpack does static analysis over `System.import` calls to split the app code
    * into chunks. We must include each import explicitly.
    */
let routes: { route: string, fn: (cb: (componentClass: React.ComponentClass<any>) => void) => void }[];

const getRoute = p => () => p.then(mod => mod.default);

export const defaultRoute = {
    route: '/',
    fn: getRoute(System.import('./components/Home'))
};

routes = [{
    route: '/users/?:id?',
    fn: getRoute(System.import('./components/Users'))
}, {
    route: '/about',
    fn: getRoute(System.import('./components/About'))
}];

export default routes;