import React, { Component } from 'react'
import Appointment from './Appointment.jsx';

class AppointmentList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let appointments = this.props.appointments
    return (
    <div>
      <div className='row'>
        <div className='col-12'>
      {appointments && appointments.length
        ? <div>
          {appointments.map((appointment) => {
            return <Appointment deleteAppointment={this.props.deleteAppointment} appointment={appointment} key={appointment.id} status={this.props.status} />
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
