import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap'

import UserListItem from './UserListItem'

export default class UserList extends React.Component {

  static propTypes = {
    userState: PropTypes.object.isRequired,
    onSetActiveUser: PropTypes.func.isRequired
  };

  render() {
    let userState = this.props.userState;
    let searchTerm = userState.get('searchTerm');
    let field = searchTerm ? 'filterUsers' : 'users';
    let users = userState.get(field).toArray();

    return (
      <Table className="user-list" striped hover>
        <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Age</th>
          <th>Phone</th>
        </tr>
        </thead>
        <tbody>
        {
          users.map(user => {
            return (
              <UserListItem key={`user-row-${user.id}`}
                            user={user}
                            onSetActiveUser={this.props.onSetActiveUser}
              />
            )
          })
        }
        </tbody>
      </Table>
    )
  }

}
