import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './root';
import { AppContainer } from 'react-hot-loader';
import AppState from './AppState';

const appState = new AppState();

import './styles/index.css';

const render = (Root, state = appState, container = document.getElementById('App')) => {
    ReactDOM.render(
        React.createElement(AppContainer, {}, React.createElement(Root, { appState: state })),
        container,
    );
}

if (typeof window !== 'undefined') {
    render(Root);
}

if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept(['./root', './AppState'], () => render(require('./root').default));
}