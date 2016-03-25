import React, {PropTypes} from 'react'
import { Button } from 'react-bootstrap'
import classnames from 'classnames'

import { ASC, DESC } from '../redux/modules/users'

export default class ToolBar extends React.Component {

  static propTypes = {
    orderState: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  getOrderTypeByField(field) {
    let currentOrderType = this.props.orderState.get(field);
    return (currentOrderType === ASC) ? DESC : ASC;
  }

  order(field) {
    let orderType = this.getOrderTypeByField(field);
    this.props.actions.orderAndActivate(field, orderType);
  }

  render () {
    let nameOrder = this.getOrderTypeByField('name');
    let ageOrder = this.getOrderTypeByField('age');

    let nameIconClasses = classnames('icon', 'fa', {
      'fa-sort-alpha-asc': nameOrder === ASC,
      'fa-sort-alpha-desc': nameOrder === DESC
    });

    let ageIconClasses = classnames('icon', 'fa', {
      'fa-sort-numeric-asc': ageOrder === ASC,
      'fa-sort-numeric-desc': ageOrder === DESC
    });

    return (
      <div className='toolbar'>
        <Button onClick={this.order.bind(this, 'name')} >
          <i className={nameIconClasses} />
          Sort by name
        </Button>
        <Button onClick={this.order.bind(this, 'age')} >
          <i className={ageIconClasses} />
          Sort by age
        </Button>
      </div>
    )
  }
}
