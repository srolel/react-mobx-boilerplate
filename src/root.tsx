import * as React from 'react';
import AppState from './AppState';
import Core from './components/Core';

interface Props { appState: AppState, getPathname: () => string }
interface State { component: React.ComponentClass<any> }

class Root extends React.Component<Props, State> {

  static childContextTypes = {
    appState: React.PropTypes.any
  };

  static defaultProps: Partial<Props> = {
    getPathname() {
      const link = document.createElement('a');
      link.href = document.location.href;
      return link.pathname;
    }
  }

  state = { component: null };

  getChildContext() {
    return { appState: this.props.appState };
  }

  getRoute(pathname = this.props.getPathname()) {
    /*
    * webpack does static analysis over `require` and `System.import` calls to either add modules
    * to the chunk (`require`) or split them into separate chunks (`System.import`).
    * in development, we use `require` for HMR to work.
    */
    let component: React.ComponentClass<any>;
    if (__DEVELOPMENT__) {
      switch (pathname) {
        case '/users':
          this.setState({component: (require('./components/Users')).default});
          break;
        case '/about':
          this.setState({component: (require('./components/About')).default});
          break;
        default:
          this.setState({component: (require('./components/Home')).default});
      }
    } else {
      switch (pathname) {
        case '/users':
          System.import('./components/Users').then(mod => this.setState({component: mod.default}));
          break;
        case '/about':
          System.import('./components/About').then(mod => this.setState({component: mod.default}));
          break;
        default:
          System.import('./components/Home').then(mod => this.setState({component: mod.default}));
      }
    }
    return component;
  }

  onpopstate = async () => {
    this.getRoute();
  }

  componentWillMount() {
    this.onpopstate();
  }

  pushState: typeof history.pushState;

  componentDidMount() {
    // hook a listener to pushState
    this.pushState = history.pushState;
    history.pushState = (...args) => {
      this.pushState.apply(history, args);
      this.onpopstate();
    }
  }

  componentWillUnmount() {
    // remove listener (useful for HMR)
    history.pushState = this.pushState;
  }

  render() {
    if (!this.state.component) return null;
    return (
      <Core children={React.createElement(this.state.component)} />
    );
  }
}

export default Root;
