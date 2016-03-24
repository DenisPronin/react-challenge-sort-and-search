import React, { PropTypes } from 'react'
import connectWrapper from '../redux/utils/connect'
import actions from '../redux/rootActions'
import { Row, Col } from 'react-bootstrap'

import UserContainer from '../components/UserContainer'

export class AppLayout extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render () {
    let state = this.props.state;

    return (
      <div className="app container-fluid">
        <Row>
          <Col sm={12}>
            searcBar
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            toolbar
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
