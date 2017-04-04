import * as React from 'react';
import AppState from './AppState';
import Routing from './Routing';
import Core from './components/Core';
import { observer } from 'mobx-react';

interface Props { appState: AppState, routing: Routing }

@observer
class Root extends React.Component<Props, {}> {

  render() {
    const {route} = this.props.routing;
    return (
      <Core children={route} />
    );
  }
}

export default Root;
