import React, { PropTypes } from 'react'
import { Thumbnail, Table } from 'react-bootstrap'

export default class UserList extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    let user = this.props.user;

    return (
      <Thumbnail src={`images/${user.image}.svg`}>
        <h3>{user.name}</h3>
        <Table className="user-info">
          <tbody>
          <tr>
            <td>Age:</td>
            <td>{user.age}</td>
          </tr>
          <tr>
            <td>Favorite animal:</td>
            <td>{user.image}</td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td>8 {user.phone}</td>
          </tr>
          </tbody>
        </Table>
        <div>
          <b>Favorite phrase:</b>
          <div>{user.phrase}</div>
        </div>
      </Thumbnail>
    )
  }

}
