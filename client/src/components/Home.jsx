import React, { Component } from 'react'
import AppointmentList from './AppointmentList.jsx';
import MedicalInfo from './MedicalInfo.jsx';

class Home extends Component {
  constructor() {
    super()
    this.state = {
      patient: 7
    }
  }

  componentDidMount() {
    this.getAppointments('upcoming')
    this.getAppointments('completed')
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getAppointments(status) {
    this.fetch(`/api/patients/${this.state.patient}/appointments/`)
      .then(appointments => {
        if (appointments.length) {
          const appts = appointments.filter(app => app.status === status)
          if (status === 'completed') {
            this.setState({ completedAppointments: appts })
          } else {
            this.setState({ upcomingAppointments: appts })
          }
        }
      })
  }

  render() {
    let { completedAppointments, upcomingAppointments } = this.state
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-8'>
          <a className='btn btn-primary' href='/bookingCalendar' role='button'>Book Appointment</a>
          <h3>Upcoming Appointments</h3>
          {upcomingAppointments && upcomingAppointments.length
            ? (<AppointmentList appointments={this.state.upcomingAppointments} status={'upcoming'} />)
            : <div className='container' textAlign='center'>No appointments found.</div>}
          <h3>Previous Appointments</h3>
          {completedAppointments && completedAppointments.length
            ? <AppointmentList appointments={this.state.completedAppointments} status={'completed'} />
            : <div className='container' textAlign='center'>No appointments found.</div>}
          </div>
          <div className='col-4'>
            <MedicalInfo patient={this.state.patient} />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
