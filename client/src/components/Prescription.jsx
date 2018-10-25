import React, { Component } from 'react'

class Prescription extends Component {

  render() {
    const prescription = this.props.prescription 

    return (
      <p><em>{prescription.name}</em>< br/>
      <span>Dose:</span><span>{prescription.dose}</span>< br/>
      <span>Refill:</span><span>{prescription.refill}</span>< br/>
      <span>Route:</span><span>{prescription.route}</span>< br/>
      <span>Date:</span><span>{prescription.date}</span>
      </p>
    );
  }
}

export default Prescription;
