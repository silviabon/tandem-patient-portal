import React, { Component } from 'react'
import Prescription from './Prescription.jsx'

class Prescriptions extends Component {

  render() {
    const prescriptionsItems = this.props.prescriptions.map(prescription => (
      <Prescription prescription={prescription} key={prescription.id} />
    ))

    return (
      <div>
        <h3 className='card-header'>Prescriptions</h3>
        {prescriptionsItems}
      </div>
    )
  }
}

export default Prescriptions
