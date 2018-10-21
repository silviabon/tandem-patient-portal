import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import AppointmentList from './AppointmentList.jsx';


class Home extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
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
    this.fetch('/api/patients/1/appointments/')
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
    let { completedAppointments } = this.state
    return completedAppointments
      ? <Container text>
        {completedAppointments && completedAppointments.length
          ? <Container>
            <br />
            <Button >Book Appointment</Button>
            <Header as='h3' >
              <Header.Content>
                Upcoming Appointments
             </Header.Content>
            </Header>
            <AppointmentList appointments={this.state.upcomingAppointments} status={'upcoming'} />
            <Header as='h3' >
              <Header.Content>
                Previous Appointments
              </Header.Content>
            </Header>
            <AppointmentList appointments={this.state.completedAppointments} status={'completed'} />
          </Container>
          : <Container textAlign='center'>Loading...</Container>
        }
      </Container>
      : <Container text>
        <p>Loading...</p>
      </Container>
  }
}


export default Home