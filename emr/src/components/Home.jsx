import React, { Component } from 'react'
import ProviderAppointmentList from './ProviderAppointmentList.jsx'
import { Container, Header } from 'semantic-ui-react'
import axios from 'axios'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.setState({ patients: this.props.patients })
    this.setState({ hell: true })
    axios.get(`/api/providers/${this.props.provider}/appointments/`)
      .then(res3 => {
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
      <Container>
        <br /><br />
        <div className='row'>
          <div className='col-8'>
            <Header as='h3' dividing>Upcoming Patients</Header>
            {upcomingAppointments && upcomingAppointments.length
              ? (<ProviderAppointmentList appointments={this.state.upcomingAppointments} patients={this.state.patients} status={'upcoming'} />)
              : <Container>No appointments found.</Container>}
            <Header as='h3' dividing>Previous Patients</Header>
            {completedAppointments && completedAppointments.length
              ? <ProviderAppointmentList appointments={this.state.completedAppointments} patients={this.state.patients} status={'completed'} />
              : <Container>No appointments found.</Container>}
          </div>
        </div>
        <br /><br />
      </Container>
    )
  }
}

export default Home
