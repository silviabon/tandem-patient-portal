import React, { Component } from 'react'
import Condition from './Condition.jsx';

class Conditions extends Component {

  render() {
    const conditionsItems = this.props.conditions.map(condition => (
      <Condition condition={condition} key = {condition.id} />
    ));

    return (
      <div className='container'>
        <h3>Conditions</h3>
        {conditionsItems}
        <br/>
      </div>
    )

  }
}

export default Conditions
