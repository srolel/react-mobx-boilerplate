import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './root';
import { AppContainer } from 'react-hot-loader';
import Routing from './Routing';

const routing = new Routing();

import './styles/index.css';

let props = {
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

    /* 
    * reloading the routing store allows hot reload to work through chunking and lazy loading,
    * while passing the previous appState allows to hot reload the store
    */
    module.hot.accept(['./Routing'], reload({ routing: new Routing(props.routing.appState) }));
}