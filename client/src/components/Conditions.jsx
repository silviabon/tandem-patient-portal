import React, { Component } from 'react'
import Condition from './Condition.jsx';

class Conditions extends Component {

  render() {
    const conditionsItems =this.props.conditions.map(condition => (
      <Condition condition={condition} key={condition.id} />
    ));

    return (
      <div>
        <h3 className='card-header'>Conditions</h3>
        {conditionsItems}
      </div>
    )

  }
}

export default Conditions
