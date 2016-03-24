import React, { PropTypes } from 'react'

export default class UserList extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    let user = this.props.user;

    return (
      <tr>
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
