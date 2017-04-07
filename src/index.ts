import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './root';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const app = new App();

import './styles/index.css';

let props = {
    app
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
    const reload = (newProps?: Partial<typeof props>) => () => {
        // global listeners etc.    
        if (newProps) props.app.unload();

        render(require('./root').default, newProps);
    };

    module.hot.accept(['./root'], reload());

    /* 
    * reloading the app store allows hot reload to work through chunking and lazy loading,
    * while passing the previous appState allows to hot reload the store
    */
    module.hot.accept(['./App'], reload({ app: new App(props.app.appState) }));
}