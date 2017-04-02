import * as React from 'react';
import AppState from '../AppState';
import {observer} from 'mobx-react';

@observer
class Home extends React.Component<any, any> {

  context: {
    appState: AppState
  }

  static contextTypes = {
    appState: React.PropTypes.instanceOf(AppState)
  };

  onClick = () => {
    this.context.appState.resetTimer()
  }

  render() {
    return (
      <div className="home">
        <h1>
          Welcome to the app!
        </h1>
        <p>timer: {this.context.appState.timer}</p>
        <button onClick={this.onClick}>Reset</button>
      </div>
    );
  }
}

export default Home;
