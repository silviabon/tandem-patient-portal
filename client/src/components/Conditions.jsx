import React, { Component } from 'react'
import Condition from './Condition.jsx';


class Conditions extends Component {


  render() {
    const conditionsItems = this.props.conditions.map(condition => (
      <Condition condition={condition} key = {condition.id} />
    ));

    return (
      <div className='container'>
        <h4>Conditions</h4>
        {conditionsItems}
        <br/>
      </div>
    )

  }
}

export default Conditions


