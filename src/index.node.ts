import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Root from './root';
import AppState from './AppState';
import App from './App';

/*
* Entry point for the node bundle, used for server-side rendering.
*/

export default async (pathname = '/', appState?: AppState) => {
    const app = new App(appState);
    await app.updateLocation(pathname);
    return ReactDOMServer.renderToString(
        React.createElement(Root, { app })
    );
};