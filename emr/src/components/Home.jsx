import React, { Component } from 'react'
import ProviderAppointmentList from './ProviderAppointmentList.jsx'
import axios from 'axios'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    console.log('home component did mount')
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
    this.setState({ patients: this.props.patients })
    this.setState({ hell: true })
    axios.get(`/api/providers/${this.props.provider}/appointments/`)
    .then(res3  => {
      let appointments = res3.data
      if (appointments.length) {
        const appts = appointments.filter(app => app.status === 'completed')
        this.props.updateCompletedAppointmentsInState(appts)
        this.setState({ completedAppointments: appts })
        appts = appointments.filter(app => app.status === 'upcoming')
        this.props.updateUpcomingAppointmentsInState(appts)
        this.setState({ upcomingAppointments: appts })
      }
    })
  }

  render() {
    let { completedAppointments, upcomingAppointments } = this.state
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-8'>
          <h3>Upcoming Patients</h3>
          {upcomingAppointments && upcomingAppointments.length
            ? (<ProviderAppointmentList appointments={this.state.upcomingAppointments} patients={this.state.patients} status={'upcoming'} />)
            : <div className='container'>No appointments found.</div>}
          <h3>Previous Patients</h3>
          {completedAppointments && completedAppointments.length
            ? <ProviderAppointmentList appointments={this.state.completedAppointments} patients={this.state.patients} status={'completed'} />
            : <div className='container'>No appointments found.</div>}
        </div>
        </div>
      </div>
    )
  }
}

export default Home
