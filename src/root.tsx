import * as React from 'react';
import AppState from './AppState';
import Routing from './Routing';
import Core from './components/Core';
import { observer } from 'mobx-react';

interface Props { appState: AppState, routing: Routing }

@observer
class Root extends React.Component<Props, {}> {

  static childContextTypes = {
    appState: React.PropTypes.any
  };

  getChildContext() {
    return { appState: this.props.appState };
  }

  render() {
    const {component} = this.props.routing.route;
    return (
      <Core children={component && React.createElement(component)} />
    );
  }
}

export default Root;
