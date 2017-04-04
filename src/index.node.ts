import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Root from './root';
import AppState from './AppState';
import App from './App';

const app = new App();

export default async (pathname = '/') => {
    await app.updateLocation(pathname);
    return ReactDOMServer.renderToString(
        React.createElement(Root, { app })
    );
};