import React, { Component } from 'react'


class Immunization extends Component {


  render() {
    const immunization = this.props.immunization

    return (
      <p><em>{immunization.name}</em>< br />
        <span>Dose:</span><span>{immunization.dose}</span>< br />
        <span>Date:</span><span>{immunization.date}</span>
      </p>
    );
  }
}
export default Immunization;
