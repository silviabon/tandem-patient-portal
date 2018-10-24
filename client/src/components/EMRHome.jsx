import React, { Component } from 'react'
import ProviderAppointmentList from './ProviderAppointmentList.jsx';

class EMRHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patient: 1,
      provider: 1
    }
  }

  componentDidMount() {
    console.log('did mount')
    this.getAppointments('upcoming')
    this.getAppointments('completed')
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getAppointments(status) {
    console.log('app', status)
    this.fetch(`http://localhost:3001/api/providers/${this.state.provider}/appointments/`)
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
    console.log('render', this.props.match.params.provider)
    let { completedAppointments, upcomingAppointments } = this.state
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-8'>
          <a className='btn btn-primary' href='/bookingCalendar' role='button'>Book Appointment</a>
          <h3>Upcoming Appointments</h3>
          {upcomingAppointments && upcomingAppointments.length
            ? (<ProviderAppointmentList appointments={this.state.upcomingAppointments} status={'upcoming'} />)
            : <div className='container' textAlign='center'>No appointments found.</div>}
          <h3>Previous Appointments</h3>
          {completedAppointments && completedAppointments.length
            ? <ProviderAppointmentList appointments={this.state.completedAppointments} status={'completed'} />
            : <div className='container' textAlign='center'>No appointments found.</div>}
        </div>
        </div>
      </div>
    )
  }
}

export default EMRHome
