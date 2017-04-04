import { observable, action } from 'mobx';
import { Router } from 'routes';
import routes from './routes';

const router = Router();
const noop = () => null;

routes.forEach(r => router.addRoute(r.route, r.fn));

const hasWindow = typeof window !== 'undefined';

class Route {
  @observable component = null;
  @observable params: any = {};
}

class AppState {
  @observable timer = 0;
  @observable route = new Route();

  constructor() {
    if (hasWindow) {
      setInterval(() => {
        this.timer += 1;
      }, 1000);
      this.hookHistory();
    }
  }

  @action
  updateLocation(pathname = hasWindow ? location.pathname : '/') {
    const route = router.match(pathname);
    this.route.params = route.params;
    route.fn(component => this.route.component = component);
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

  resetTimer() {
    this.timer = 0;
  }
}

export default AppState;