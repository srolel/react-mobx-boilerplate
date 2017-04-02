import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './root';
import { AppContainer } from 'react-hot-loader';
import AppState from './AppState';

const appState = new AppState();

import './styles/index.css';

const render = (Root, render = ReactDOM.render, container = document.getElementById('App')) => {
    render(
        React.createElement(AppContainer, {}, React.createElement(Root, { appState })),
        container,
    );
}

if (typeof window !== 'undefined') {
    render(Root);
}

if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept([
        './root', // Same path as imported above
    ], () => {
        render(require('./root').default);
    });
}