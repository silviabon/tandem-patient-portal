import React, { Component } from 'react'
import ProviderAppointment from './ProviderAppointment.jsx';

class ProviderAppointmentList extends Component {

  render() {
    let appointments = this.props.appointments
    return (
    <div className='container' text>
      {appointments && appointments.length
        ? <div>
          {appointments.map((appointment) => {
            return <ProviderAppointment appointment={appointment} key={appointment.id} status={this.props.status} />
          })}
        </div>
        : <div className='container' textAlign='center'>Loading...</div>
      }
    </div>
    )
  }
}

export default ProviderAppointmentList
