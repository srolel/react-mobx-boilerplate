import * as React from 'react';
import AppState from './stores/AppState';
import App from './App';
import Core from './components/Core';
import { observer } from 'mobx-react';

interface Props { app: App }

@observer
class Root extends React.Component<Props, {}> {

  render() {
    const {route} = this.props.app;
    return (
      <Core children={route} />
    );
  }
}

export default Root;
