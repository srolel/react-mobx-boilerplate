import { observable, action } from 'mobx';
import { Router } from 'routes';
import routes, {defaultRoute} from './routes';

const router = Router();
const noop = () => null;

routes.forEach(r => router.addRoute(r.route, r.fn));

const hasWindow = typeof window !== 'undefined';

class Route {
  @observable component = null;
  @observable params: any = {};
}

class AppState {
  @observable route = new Route();

  constructor() {
    if (hasWindow) {
      this.hookHistory();
    }
  }

  @action
  async updateLocation(pathname = hasWindow ? location.pathname : '/') {
    const route = router.match(pathname) || defaultRoute;
    this.route.params = route.params;
    this.route.component = await route.fn();
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
}

export default AppState;