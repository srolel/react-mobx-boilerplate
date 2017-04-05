/*
    * webpack does static analysis over `System.import` calls to split the app code
    * into chunks. We must include each import explicitly.
    */
import * as React from 'react';
import AppState from './stores/AppState';

export interface Route {
    route: string;
    onEnter?: (appState: AppState, params: object) => Promise<void>;
    getComponent: (appState: AppState, params: object) => Promise<JSX.Element>;
}

let routes: Route[];

const getRoute = p => p.then(mod => mod.default);

export const defaultRoute: Route = {
    route: '/',
    async getComponent(appState, params) {
        const Home = await getRoute(System.import('./components/Home'));
        return <Home appState={appState} />;
    }
};

routes = [{
    route: '/users/?:id?',
    async onEnter(appState, params: { id?: string }) {
        appState.setMessage('');
        if (params.id) {
            appState.setMessage(`fetching data for user ${params.id}...`);
            await new Promise(r => setTimeout(r, 500));
            appState.setMessage(`data fetched for user ${params.id}`);
        }
    },
    async getComponent(appState, params: { id: string }) {
        const Users = await getRoute(System.import('./components/Users'));
        return <Users id={params.id} appState={appState} />;
    }
}, {
    route: '/about',
    async getComponent(appState, params) {
        const About = await getRoute(System.import('./components/About'));
        return <About />;
    }
}];

export default routes;

export { routes as routes };