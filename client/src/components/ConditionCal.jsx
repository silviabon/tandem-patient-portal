import React, { Component } from 'react'



class ConditionCal extends Component {


  render() {
    const condition = this.props.condition 



    return (
        <li>{condition.name}</li>
    );
  }
}
export default ConditionCal;