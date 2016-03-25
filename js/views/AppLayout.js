import React, { PropTypes } from 'react'
import connectWrapper from '../redux/utils/connect'
import actions from '../redux/rootActions'
import { Row, Col } from 'react-bootstrap'

import Searchbar from '../components/SearchBar'
import Toolbar from '../components/ToolBar'
import UserContainer from '../components/UserContainer'

export class AppLayout extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  searchUser(event) {
    this.props.actions.searchUserAndActivate(event.target.value.trim());
  }

  render () {
    let state = this.props.state;

    return (
      <div className="app container-fluid">
        <Row>
          <Col sm={12}>
            <Searchbar onSearch={this.searchUser.bind(this)} />
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <Toolbar orderState={state.users.get('orderBy')}
                     actions={this.props.actions}
            />
          </Col>
        </Row>

        <UserContainer userState={state.users}
                       actions={this.props.actions}
        />
      </div>
    )
  }

}

export default connectWrapper(actions, AppLayout)
