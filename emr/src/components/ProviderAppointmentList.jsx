import React, { Component } from 'react'
import ProviderAppointment from './ProviderAppointment.jsx';

class ProviderAppointmentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let appointments = this.props.appointments
    return (
    <div className='container'>
      {appointments && appointments.length
        ? <div>
          {appointments.map((appointment) => {
            let patientName = this.props.patients[appointment.patient_id-1].first_name + ' ' + this.props.patients[appointment.patient_id-1].last_name
            return <ProviderAppointment patientName={patientName} patients={this.props.patients} appointment={appointment} key={appointment.id} status={this.props.status} />
          })}
        </div>
        : <div className='container'>Loading...</div>
      }
    </div>
    )
  }
}

export default ProviderAppointmentList
