import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './root';
import { AppContainer } from 'react-hot-loader';
import AppState from './AppState';
import Routing from './Routing';

const appState = new AppState();
const routing = new Routing();

import './styles/index.css';

let props = {
    appState,
    routing
};

const render = (Root, newProps?, container = document.getElementById('App')) => {
    props = { ...props, ...newProps };
    ReactDOM.render(
        React.createElement(AppContainer, {}, React.createElement(Root, props)),
        container,
    );
}

if (typeof window !== 'undefined') {
    render(Root);
}

if (__DEVELOPMENT__ && module.hot) {
    const reload = (appState?: Partial<typeof props>) => () => render(require('./root').default, appState);

    module.hot.accept(['./root'], reload());

    // using the `reload` method we can extend the store functionality while keeping the state the same
    module.hot.accept(['./AppState'], reload({ appState: new AppState().reload(props.appState) }));

    // reloading the routing store allows hot reload to work through chunking and lazy loading
    module.hot.accept(['./Routing'], reload({ routing: new Routing() }));
}