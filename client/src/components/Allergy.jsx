import React, { Component } from 'react'


class Allergy extends Component {


  render() {
    const allergy = this.props.allergy

    return (
      <div>
      {allergy.name}
      </div>
    )
  }
}
export default Allergy;
