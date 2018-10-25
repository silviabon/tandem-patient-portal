import React, { Component } from 'react'
import Prescription from './Prescription.jsx';

class Prescriptions extends Component {

  render() {
    const prescriptionsItems = this.props.prescriptions.map(prescription => (
      <Prescription prescription={prescription} key={prescription.id} />
    ));

    return (
      <div className='container'>
        <h3>Prescriptions</h3>
        {prescriptionsItems}
        <br />
      </div>
    )
  }
}

export default Prescriptions
