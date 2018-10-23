import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class AppointmentPage extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    // const { handle } = this.props.match.params
    // this.getAppointment(handle)
    this.getAppointment(3)
  }


  getAppointment(id) {
    this.fetch(`/api/patients/5/appointments/${id}`)
      .then(appointment => {
        if (appointment) {
          this.setState({ appointment: appointment })
          this.getProvider(this.state.appointment.provider_id)
          this.getSummary(this.state.appointment.id, this.state.appointment.patient_id)
        }
      })
  }

  getProvider(provider) {
    this.fetch(`/api/providers/${provider}`)
      .then(provider2 => {
        this.setState({ provider: provider2 })
      })
  }

  getSummary(appointmentId, patientId) {
    this.fetch(`/api/patients/${patientId}/appointments/${appointmentId}/soaps`)
      .then(summary => {
        if (summary.length) {
          const lastSummary = summary[summary.length - 1]
          this.setState({ summary: lastSummary.doctor_summary })
        } else {
          this.setState({ summary: [] })
        }
      })
  }
  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  render() {
    let { appointment, provider, summary } = this.state
    return <Container text textAlign='center'>
      <h1>Appointment</h1>
      {
        appointment && provider && summary
          ? <Container>
            <Container>
              <span>Date: </span><span>{appointment.date}</span><span>Time: </span><span>{appointment.time}</span><span>Dr.: </span><span>{provider.last_name}</span>
            </Container>
            <Container>
              <Header as='h3'>
                <Header.Content>
                  Patient Summary:
                </Header.Content>
              </Header>
              {appointment.patient_summary}
              </Container>
            <Container>
              <Header as='h3'>
                <Header.Content>
                  Provider Summary and Instructions:
                </Header.Content>
              </Header>
              {summary}</Container>
          </Container>

          : <p>Loading...</p>
      }
      <Button as={Link} to='/'>Back to home</Button>
    </Container>

  }
}

export default AppointmentPage

// export appointment, doctor name and soap