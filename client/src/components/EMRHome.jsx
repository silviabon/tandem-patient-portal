import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import ProviderAppointmentList from './ProviderAppointmentList.jsx';

class EMRHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patient: 6,
      provider: 7
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
      <Container>
        <Container>
          <br />
          <Header as='h3' >
            <Header.Content>
              Upcoming Appointments
            </Header.Content>
          </Header>
          {upcomingAppointments && upcomingAppointments.length
            ? (<ProviderAppointmentList appointments={this.state.upcomingAppointments} status={'upcoming'} />)
            : <Container textAlign='center'>No appointments found.</Container>}
          <Header as='h3' >
            <Header.Content>
              Previous Appointments
            </Header.Content>
          </Header>
          {completedAppointments && completedAppointments.length
            ? <ProviderAppointmentList appointments={this.state.completedAppointments} status={'completed'} />
            : <Container textAlign='center'>No appointments found.</Container>}
        </Container>
      </Container>
    )
  }
}

export default EMRHome
