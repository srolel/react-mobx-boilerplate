import * as React from 'react';
import { observer } from 'mobx-react';
import AppState from '../stores/AppState';
import Link from './Link';

@observer
class Users extends React.Component<{ id: string, appState: AppState }, any> {
  render() {
    const { id, appState } = this.props;
    return (
      <div>
        <div>Users</div>
        <ul>
          <li><Link href="/users/1">1</Link></li>
          <li><Link href="/users/2">2</Link></li>
          <li><Link href="/users/3">3</Link></li>
        </ul>
        <div>route params: <code>{JSON.stringify({ id }, null, 4)}</code></div>
        <div>message: {appState.message}</div>
      </div>
    );
  }
}

export default Users;
