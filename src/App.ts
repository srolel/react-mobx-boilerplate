import { observable, action } from 'mobx';
import { Router } from 'routes';
import { routes, defaultRoute, Route } from './routes';
import AppState, { AppStateProps } from './stores/AppState';

const hasWindow = typeof window !== 'undefined';

class App {
    @observable route: React.ReactElement<any> = null;
    @observable appState: AppState;
    router: Router<Route>;

    constructor(appState?: AppStateProps) {

        this.appState = new AppState().reload(appState);

        this.router = Router<Route>();

        routes.forEach(r => this.router.addRoute(r.route, r));

        if (hasWindow) {
            this.hookHistory();
        }
    }

    @action
    async updateLocation(pathname = hasWindow ? location.pathname : '/') {
        const match = this.router.match(pathname);
        const params = match ? match.params : {};
        const route = match ? match.fn : defaultRoute;
        const onEnter = route.onEnter || (() => Promise.resolve());
        route.getComponent(this.appState, params).then(component => this.route = component);
        await onEnter(this.appState, params);
    }

    pushState: any;
    replaceState: any;
    onpopstate: any;

    hookHistory() {
        this.updateLocation();

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

    unload() {
        window.onpopstate = this.onpopstate;
        history.pushState = this.pushState;
        history.replaceState = this.replaceState;
    }
}

export default App;