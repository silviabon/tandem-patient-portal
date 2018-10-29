import React, { Component } from 'react'

class Immunization extends Component {

  render() {
    const immunization = this.props.immunization

    return (
      <div className='card-body med-info'>
        <p><em>{immunization.name}</em>< br />
          <span>Dose:</span><span>{immunization.dose}</span>< br />
          <span>Date:</span><span>{immunization.date}</span></p>
      </div>
    )
  }
}
export default Immunization;
