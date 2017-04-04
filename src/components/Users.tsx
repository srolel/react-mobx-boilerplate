import * as React from 'react';
import { observer } from 'mobx-react';
import Link from './Link';

@observer
class Users extends React.Component<{id: string}, any> {

    render() {
        const {id} = this.props;
        return (
            <div>
                <div>Users</div>
                <ul>
                    <li><Link href="/users/1">1</Link></li>
                    <li><Link href="/users/2">2</Link></li>
                    <li><Link href="/users/3">3</Link></li>
                </ul>
                route params: <code>{JSON.stringify({id}, null, 4)}</code>
            </div>
        );
    }
}

export default Users;
