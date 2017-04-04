/*
    * webpack does static analysis over `System.import` calls to split the app code
    * into chunks. We must include each import explicitly.
    */
import * as React from 'react';
import AppState from './AppState';

interface Route {
    route: string;
    fn: (appState: AppState, params: object) => void;
}

let routes: Route[];

const getRoute = p => p.then(mod => mod.default);

export const defaultRoute: Route = {
    route: '/',
    async fn(appState, params) {
        const Home = await getRoute(System.import('./components/Home'));
        return <Home appState={appState} />;
    }
};

routes = [{
    route: '/users/?:id?',
    async fn(appState, params: { id: string }) {
        const Users = await getRoute(System.import('./components/Users'));
        return <Users id={params.id} />;
    }
}, {
    route: '/about',
    async fn(appState, params) {
        const About = await getRoute(System.import('./components/About'));
        return <About />;
    }
}];

export default routes;