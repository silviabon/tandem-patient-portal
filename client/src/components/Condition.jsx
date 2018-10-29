import React, { Component } from 'react'

class Condition extends Component {

  render() {
    const condition = this.props.condition

    return (
      <div>
      {condition.name}
      </div>
    )
  }
}
export default Condition
