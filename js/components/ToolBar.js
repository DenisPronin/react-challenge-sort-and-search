import React, {PropTypes} from 'react'
import { Button } from 'react-bootstrap'

export default class ToolBar extends React.Component {

  render () {
    return (
      <div className='toolbar'>
        <Button>
          <i className="icon fa fa-sort-alpha-asc" />
          Sort by name
        </Button>
        <Button>
          <i className="icon fa fa-sort-numeric-desc" />
          Sort by age
        </Button>
      </div>
    )
  }
}
