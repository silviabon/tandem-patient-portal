import React, { Component } from 'react'



class ConditionCal extends Component {


  render() {
    const condition = this.props.condition 



    return (
        <option value={condition.name}>{condition.name}</option>
    );
  }
}
export default ConditionCal;