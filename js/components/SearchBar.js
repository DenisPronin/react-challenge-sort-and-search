import React, {PropTypes} from 'react'
import { Input } from 'react-bootstrap'

export default class SearchBar extends React.Component {

  render () {
    return (
      <div className="searchbar" >
        <Input type="text" placeholder="Search people by name..."/>
      </div>
    )
  }
}
