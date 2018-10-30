import React, { Component } from 'react'
import Appointment from './Appointment.jsx';

class AppointmentList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let appointments = this.props.appointments.sort(function (a, b) { return new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse())})
    return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
      {appointments && appointments.length
        ? <div>
          {appointments.map((appointment) => {
            return <Appointment deleteAppointment={this.props.deleteAppointment} appointment={appointment}  updateAppointmentInState={this.props.updateAppointmentInState} key={appointment.id} status={this.props.status} patient={this.props.patient} />
          })}
        </div>
        : <div className='container'>Loading...</div>
      }
        </div>
      </div>
    </div>
    )
  }
}

export default AppointmentList
