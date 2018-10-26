import React, { Component } from 'react'


class Allergy extends Component {


  render() {
    const allergy = this.props.allergy

    return (
      <div className='card-body med-info'>
      <p> <span>{allergy.name}</span></p>
      </div>
    );
  }
}
export default Allergy;
