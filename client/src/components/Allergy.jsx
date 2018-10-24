import React, { Component } from 'react'


class Allergy extends Component {


  render() {
    const allergy = this.props.allergy

    return (
      <p> <span>{allergy.name}</span></p>
    );
  }
}
export default Allergy;
