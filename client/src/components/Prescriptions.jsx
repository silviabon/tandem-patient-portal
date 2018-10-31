import React, { Component } from 'react'
import Prescription from './Prescription.jsx'

class Prescriptions extends Component {

  render() {
    const prescriptionsItems = this.props.prescriptions.map(prescription => (
      <Prescription prescription={prescription} key={prescription.id} />
    ))

    return (
      <div>
        <h2 className='card-header'>Prescriptions</h2>
        {prescriptionsItems}
      </div>
    )
  }
}

export default Prescriptions
