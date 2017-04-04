import { observable, action } from 'mobx';
import { Router } from 'routes';
import routes, { defaultRoute } from './routes';
import AppState, { AppStateProps } from './AppState';

const router = Router();
const noop = () => null;

routes.forEach(r => router.addRoute(r.route, r.fn));

const hasWindow = typeof window !== 'undefined';

class App {
    @observable route: React.ReactElement<any> = null;
    @observable appState: AppState;

    constructor(appState?: AppStateProps) {
        this.appState = new AppState().reload(appState);
        if (hasWindow) {
            this.hookHistory();
        }
    }

    @action
    async updateLocation(pathname = hasWindow ? location.pathname : '/') {
        const route = router.match(pathname) || defaultRoute;
        this.route = await route.fn(this.appState, route.params);
    }

    hookHistory() {
        this.updateLocation();

        const pushState = history.pushState;
        history.pushState = (...args) => {
            pushState.apply(history, args);
            this.updateLocation();
        }

        const replaceState = history.replaceState;
        history.replaceState = (...args) => {
            replaceState.apply(history, args);
            this.updateLocation();
        }

        window.onpopstate = () => this.updateLocation();
    }

    reload(appState: AppState) {
        this.appState = appState;
        return this;
    }
}

export default App;