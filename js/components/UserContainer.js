import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'

import UserCard from '../components/UserCard'
import UserList from '../components/UserList'
import Spinner from '../components/Spinner'

export default class UserContainer extends React.Component {
  static propTypes = {
    userState: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.actions.getUsers();
  }

  setActiveUser(userId) {
    this.props.actions.setActiveUser(userId);
  }

  render() {
    let userState = this.props.userState;
    let activeUserId = userState.get('activeUserId');
    let activeUser = userState.getIn(['users', activeUserId]);
    let isGetPending = userState.get('isGetPending');

    return (
      <div>
        {
          isGetPending &&
          <Spinner />
        }
        {
          !isGetPending &&
          <Row>
            <Col sm={4} md={3} lg={2}>
              {
                !activeUser &&
                <h3>Nothing found :(</h3>
              }
              {
                activeUser &&
                <UserCard user={activeUser}/>
              }
            </Col>

            <Col sm={9} md={9} lg={10}>
              <UserList userState={userState}
                        onSetActiveUser={this.setActiveUser.bind(this)}
              />
            </Col>
          </Row>
        }
      </div>
    )
  }
}
