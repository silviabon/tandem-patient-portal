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
    console.log('component did mount')
    this.getCompletedAppointments()
    this.getUpcomingAppointments()
  }

  fetch(endpoint) {
    console.log('doing fetch')
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getUpcomingAppointments() {
    this.fetch('/api/patients/1/appointments/')
      .then(appointments => {
        if (appointments.length) {
          const appts = appointments.filter(app => app.status === 'upcoming')
          this.setState({ upcomingAppointments: appts })
        } else {
          this.setState({ upcomingAppointments: [] })
        }
      })
  }

  getCompletedAppointments() {
    console.log('getting appointments')
    this.fetch('/api/patients/1/appointments/')
      .then(appointments => {
        console.log('got appointments')
        if (appointments.length) {
          const appts = appointments.filter(app => app.status === 'completed')
          this.setState({ completedAppointments: appts })
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
            <AppointmentList appointments={this.state.upcomingAppointments} />
            <Header as='h3' >
              <Header.Content>
                Previous Appointments
              </Header.Content>
            </Header>
            <AppointmentList appointments={this.state.completedAppointments} />
          </Container>
          : <Container textAlign='center'>No appointments found.</Container>
        }
        <Divider section />

      </Container>
      : <Container text>
        <p>Loading...</p>
      </Container>
  }
}


// if (this.state.loading) {
//   console.log("inside home, this is the state: ", this.state.upcomingAppointments)

//   return <h1>Loading...</h1>
// } else {
//   console.log("is it state loading? ", this.state.loading)
//   return (
//     <Container>
//     <br />
//     <Button >Book Appointment</Button>
//     <Header as='h3' >
//       <Header.Content>
//         Upcoming Appointments
//      </Header.Content>
//     </Header>
//     <AppointmentList appointments={this.state.upcomingAppointments} />
//     <Header as='h3' >
//       <Header.Content>
//         Previous Appointments
//       </Header.Content>
//     </Header>
//     <AppointmentList appointments={this.state.previousAppointments} />
//   </Container>
//   )}



export default Home