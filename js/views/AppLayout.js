import React, { PropTypes } from 'react'
import connectWrapper from '../redux/utils/connect'
import actions from '../redux/rootActions'
import { Row, Col } from 'react-bootstrap'

export class AppLayout extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.actions.getUsers();
  }

  render () {
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

        <Row>
          <Col sm={4} md={3} lg={2}>
            active card
          </Col>
          <Col sm={9} md={9} lg={10}>
            userlist
          </Col>
        </Row>
      </div>
    )
  }

}

export default connectWrapper(actions, AppLayout)
