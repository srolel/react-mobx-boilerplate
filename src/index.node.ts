import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Root from './root';
import AppState from './AppState';
import Routing from './Routing';

const appState = new AppState();
const routing = new Routing();

export default async (pathname = '/') => {
    await routing.updateLocation(pathname);
    return ReactDOMServer.renderToString(
        React.createElement(Root, { appState, routing })
    );
};