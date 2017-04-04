import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Root from './root';
import AppState from './AppState';

const appState = new AppState();

export default (pathname = '/') => {
    appState.updateLocation(pathname);
    return ReactDOMServer.renderToString(
        React.createElement(Root, { appState })
    );
};