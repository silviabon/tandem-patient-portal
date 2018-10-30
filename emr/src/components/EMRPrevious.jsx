import React, { Component } from 'react'
import { Container, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Vitals from './Vitals.jsx';
import PropTypes from 'prop-types'

class EMRPrevious extends Component {
  constructor() {
    super()
    this.state = {
    }
  }
  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    let theOne = [];
    let currentAppointment = this.props.location.pathname.split('/')[2]
    this.props.upcomingAppointments.forEach(app => {
      if (app.id == currentAppointment) {
        theOne = app
      }
    })
    this.getAppointment(theOne.patient_id, currentAppointment)
    this.getVitalsInfo(theOne.patient_id)
    this.getPatientInfo(theOne.patient_id)
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getVitalsInfo(patient) {
    this.fetch(`/api/patients/${patient}/vitals`)
      .then(vitals => {
        if (vitals.length) {
          const lastVital = vitals[vitals.length - 1]
          this.setState({ vitals: lastVital })
        } else {
          this.setState({ vitals: [] })
        }
      })
  }

  getProvider(provider) {
    this.fetch(`/api/providers/${provider}`)
      .then(provider => this.setState({ provider: provider }))
  }

  getAppointment(patient, appointment) {
    this.fetch(`/api/patients/${patient}/appointments/${appointment}`)
      .then(appointment => this.setState({ appointment: appointment }))
  }

  getPatientInfo(patient) {
    this.fetch(`/api/patients/${patient}`)
      .then(patient => this.setState({ patient }))
  }

  handleSubmit = event => {
    event.preventDefault()
    alert('An form was submitted')
    let body = JSON.stringify({ soap: { doctor_summary: event.target.doctor_summary.value } })
    fetch(`http://localhost:3001/api/patients/${this.state.patient.id}/appointments/${this.state.appointment.id}/soaps/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => { this.context.router.history.push(`/home`); return response.json() })
  }

  render() {
    let { vitals, appointment, patient } = this.state
    return (
      <Container>
        {patient
          ? <Header as='h2'>Patient name: {patient.first_name} {patient.last_name}</Header>
          : <Container>Loading... </Container>
        }
        <Header as='h3' dividing>Patient summary</Header>
        <form onSubmit={this.handleSubmit}>
          {appointment
            ? <div><p>Type: {this.state.appointment.app_type}</p>
              <p>Concern: {this.state.appointment.concern}</p>
              <p>Description: {this.state.appointment.concern_desc}</p>
              <p>Symptoms: {this.state.appointment.symptoms}</p>
              <p>Other symptoms: {this.state.appointment.other_symptoms}</p>
              <p>Question 1: {this.state.appointment.q1}</p>
              <p>Question 2: {this.state.appointment.q2}</p>
              <input type="hidden" name='appt_num' value={this.state.appointment.id}></input>
            </div>
            : <div className='container'> loading... </div>
          }
          {vitals
            ? <Vitals vitals={this.state.vitals} />
            : <div className='container'> loading... </div>
          }
          <Header as='h3' dividing>Summary</Header>
          <textarea id="doctor_summary" name="doctor_summary" rows="3" cols="33" maxLength="200" wrap="hard">
          </textarea>
          <br />
        </form>
        <br />
        <Link to={{ pathname: '/home' }} ><Button color='teal'>Back</Button></Link>
      </Container>
    )
  }
}

export default EMRPrevious
