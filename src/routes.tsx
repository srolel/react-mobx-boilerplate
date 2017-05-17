
import * as React from 'react';
import AppState from './stores/AppState';
/*
    * webpack does static analysis over `System.import` calls to split the app code
    * into chunks. We must include each import explicitly.
    */

export interface Route {
  // The actual route name, containing what URLs this route matches. 
  // For example for defining a route for /books - you'd pass `books'.
  // parameters can be passed with `:` express like syntax, for example `/books/:id/`
  route: string;
  // This is how you tell what route gets what component, the decision can be made asynchronously
  // and data fetching can also occur here. Typically you'd initialize the data a page needs 
  // to a consistent state here 
  getComponent: (appState: AppState, params: object) => Promise<JSX.Element>;
  // This optionally (if passed) gets called after the routing happens. Server-Side-Rendering also 
  // waits for this to finish before the route actually changes. 
  // This is useful because routes typically need additional data loading logic _after_ they mount.
  // For example - a books component might require data after loading (and a loading indicator can be
  // shown in the meantime).
  onEnter?: (appState: AppState, params: object) => Promise<void>;
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
    if (params.id) { // simuate additional fetching that needs to happen after route loads
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
