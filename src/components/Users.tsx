import * as React from 'react';
import Routing from '../Routing';
import { observer } from 'mobx-react';
import Link from './Link';

@observer
class Users extends React.Component<any, any> {

    context: {
        routing: Routing
    }

    static contextTypes = {
        routing: React.PropTypes.any
    };

    render() {
        return (
            <div>
                <div>Users</div>
                <ul>
                    <li><Link href="/users/1">1</Link></li>
                    <li><Link href="/users/2">2</Link></li>
                    <li><Link href="/users/3">3</Link></li>
                </ul>
                route params: <code>{JSON.stringify(this.context.routing.route.params, null, 4)}</code>
            </div>
        );
    }
}

export default Users;
