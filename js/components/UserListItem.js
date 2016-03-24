import React, { PropTypes } from 'react'

export default class UserList extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    onSetActiveUser: PropTypes.func.isRequired
  };

  render() {
    let user = this.props.user;

    return (
      <tr onClick={this.props.onSetActiveUser.bind(this, user.id)}>
        <td>
          <img src={`images/${user.image}.svg`} alt="" className="user-image"/>
        </td>
        <td>{user.name}</td>
        <td>{user.age}</td>
        <td>8 {user.phone}</td>
      </tr>
    )
  }

}
