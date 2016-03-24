import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap'

import Spinner from './Spinner'
import UserListItem from './UserListItem'

export default class UserList extends React.Component {

  static propTypes = {
    userState: PropTypes.object.isRequired
  };

  render() {
    let userState = this.props.userState;

    return (
      <div>
        {
          userState.get('isGetPending') &&
          <Spinner />
        }
        {
          !userState.get('isGetPending') &&
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
              userState.get('userIds').map(userId => {
                let user = userState.get('users')[userId];
                return (
                  <UserListItem key={`user-row-${userId}`}
                                user={user}
                  />
                )
              })
            }
            </tbody>
          </Table>
        }
      </div>
    )
  }

}
