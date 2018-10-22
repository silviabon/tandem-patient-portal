import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import AppointmentList from './AppointmentList.jsx';
import MedicalInfo from './MedicalInfo.jsx';

class Home extends Component {
  constructor() {
    super()
    this.state = {
      patient: 5,
      upcomingAppointments: [],
      completedAppointments: []
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
    this.fetch('/api/patients/5/appointments/')
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
      <Container>
        <Container>
          <br />
          <Button >Book Appointment</Button>
          <Header as='h3' >
            <Header.Content>
              Upcoming Appointments
            </Header.Content>
          </Header>
          {upcomingAppointments && upcomingAppointments.length
            ? (<AppointmentList appointments={this.state.upcomingAppointments} status={'upcoming'} />)
            : <Container textAlign='center'>No appointments found.</Container>}
          <Header as='h3' >
            <Header.Content>
              Previous Appointments
            </Header.Content>
          </Header>
          {completedAppointments && completedAppointments.length
            ? <AppointmentList appointments={this.state.completedAppointments} status={'completed'} />
            : <Container textAlign='center'>No appointments found.</Container>}
        </Container>
            <MedicalInfo patient={this.state.patient} />
      </Container>
    )
  }
}

export default Home
