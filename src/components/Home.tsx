import * as React from 'react';
import AppState from '../stores/AppState';
import {observer} from 'mobx-react';

@observer
class Home extends React.Component<{appState: AppState}, any> {

  onClick = () => {
    this.props.appState.resetTimer()
  }

  render() {
    return (
      <div className="home">
        <h1>
          Welcome to the app!
        </h1>
        <p>timer: {this.props.appState.timer}</p>
        <button onClick={this.onClick}>Reset</button>
      </div>
    );
  }
}

export default Home;
