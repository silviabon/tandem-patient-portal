import React, { Component } from 'react'

class Condition extends Component {

  render() {
    const condition = this.props.condition

    return (
      <p> <span>{condition.name}</span></p>
    );
  }
}
export default Condition;
