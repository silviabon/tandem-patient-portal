import React, { Component } from 'react'

class Condition extends Component {

  render() {
    const condition = this.props.condition

    return (
      <div className='card-body med-info'>
      <p> <span>{condition.name}</span></p>
      </div>
    );
  }
}
export default Condition;
