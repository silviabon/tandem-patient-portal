import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Label, Header, Segment, Loader } from 'semantic-ui-react'

class ProviderAppointment extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.getProvider(this.props.appointment.provider_id)
    this.setState({ patient: this.props.appointment.patient_id })
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getProvider(provider) {
    this.fetch(`/api/providers/${provider}`)
      .then(provider => this.setState({ provider: provider }))
  }

  render() {
    const appt = this.props.appointment
    const status = this.props.status
    const patientName = this.props.patientName
    let { provider, patient } = this.state
    let link = `emr/${this.props.appointment.id}`
    return provider && patient
      ? (
        <Container>
          <br />
          <Segment>
            <Header as='h5' attached='top' inverted>Main Concern: <em>{appt.concern}</em></Header>
            <div className='card-body'>
              <p><Label horizontal>Date:</Label> {appt.date}</p>
              <p><Label horizontal>Time:</Label> {appt.time}</p>
              <p><Label horizontal>Patient:</Label> {patientName}</p>
              <p>{appt.concern_desc}</p>
            </div>
            {status === "upcoming"
              ? <span>
                <Link to={{ pathname: link, state: { appointment: { appt }, patient: { patient } } }}><Button primary>See patient</Button></Link>
              </span>
              : <div>&nbsp;</div>
            }
          </Segment>
        </Container>
      )
      : <Container>
        <Loader active inline />
      </Container>
  }
}

export default ProviderAppointment
