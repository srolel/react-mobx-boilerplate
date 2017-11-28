import { useStrict, observable, action } from 'mobx';
import { Router } from 'routes';
import { routes, defaultRoute, Route } from './routes';
import AppState, { AppStateProps } from './stores/AppState';

useStrict(true);

const hasWindow = typeof window !== 'undefined';

// This class represents our main react application, you typically do not
// need to edit this code yourself at all.
class App {
  // the main element we're rendering, this reacts to route changes (MobX).
  @observable route: React.ReactElement<any> = null;
  // our main app state, this is available in your router
  @observable appState: AppState;
  // our router
  router: Router<Route>;

  constructor(appState?: AppStateProps, router?: Router<Route>) {

    // we optionally reload the state useful for hot reload and server-side rendering, 
    // but also as an extension point for restoring the data from localStorage.
    this.appState = new AppState().reload(appState);

    // initialize our router, or optionally pass it to the constructor
    if (!router) {
      this.router = Router<Route>();
      routes.forEach(r => this.router.addRoute(r.route, r));
    } else {
      this.router = router;
    }

    this.hookHistory();
  }

  @action setRoute = (component) => {
    this.route = component;
  }

  async updateLocation(pathname = hasWindow ? location.pathname : '/') {
    const match = this.router.match(pathname);
    const params = match ? match.params : {};
    const route = match ? match.fn : defaultRoute;
    const onEnter = route.onEnter || (() => Promise.resolve());
    route.getComponent(this.appState, params).then(this.setRoute);
    await onEnter.call(route, this.appState, params);
  }

  pushState: any;
  replaceState: any;
  onpopstate: any;

  hookHistory() {
    this.updateLocation();

    if (typeof history !== 'undefined') {
      this.pushState = history.pushState;
      history.pushState = (...args) => {
        this.pushState.apply(history, args);
        this.updateLocation();
      }

      this.replaceState = history.replaceState;
      history.replaceState = (...args) => {
        this.replaceState.apply(history, args);
        this.updateLocation();
      }

      this.onpopstate = window.onpopstate;
      window.onpopstate = (e: PopStateEvent) => {
        this.onpopstate.apply(window, e);
        this.updateLocation();
      };
    }
  }

  unload() {
    window.onpopstate = this.onpopstate;
    history.pushState = this.pushState;
    history.replaceState = this.replaceState;
    this.appState.unload();
  }
}

export default App;
