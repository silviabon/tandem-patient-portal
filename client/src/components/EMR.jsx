import React, { Component } from 'react'
import { Container, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Vitals from './Vitals.jsx';
import PropTypes from 'prop-types'

class EMR extends Component {
  constructor() {
    super()
    this.state = {
      patient: 11
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.getAppointment()
    this.getVitalsInfo()
    // this.getSOAP(this.props.appointment.provider_id)
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getVitalsInfo() {
    this.fetch(`/api/patients/${this.props.location.state.patient.patient}/vitals`)
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

  getAppointment() {
    this.fetch(`/api/patients/${this.props.location.state.patient.patient}/appointments/${this.props.location.state.appointment.appt.id}`)
      .then(appointment => this.setState({ appointment: appointment }))
  }

  handleSubmit = event => {
    event.preventDefault()
    alert('An form was submitted')
    let body = JSON.stringify({soap: {doctor_summary: event.target.doctor_summary.value}})
    fetch('http://localhost:3001/api/patients/1/appointments/5/soaps/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body,
      }).then((response) => { this.context.router.history.push(`/emrhome`); return response.json()})
  }

  render () {
    let { vitals, appointment, upcomingAppointments } = this.state
    let first_name = "PFN"
    let last_name = "PLN"
    return <div className='container'>
      <h1>EMR Page</h1>
      <h2>Patient name: {first_name} {last_name}</h2>
      <h3>Patient summary</h3>
      <form onSubmit={this.handleSubmit}>
      {appointment
          ? <div><p>Type: {this.state.appointment.app_type}</p>
          <p>Concern: {this.state.appointment.concern}</p>
          <p>Description: {this.state.appointment.concern_desc}</p>
          <p>Symptoms: {this.state.appointment.symptoms}</p>
          <p>Other symptoms: {this.state.appointment.other_symptoms}</p>
          <p>Vitals</p>
          <p>Temperature: {this.state.appointment.temp}</p>
          <p>Heart rate: {this.state.appointment.heart_rate}</p>
          <p>Blood Pressure: {this.state.appointment.bp}</p>
          <p>Question 1: {this.state.appointment.q1}</p>
          <p>Question 2: {this.state.appointment.q2}</p></div>
        : <div className='container' textAlign='center'> loading... </div>
      }
      <h3>Subjective</h3>
      <textarea id="subjective" name="subjective" rows="3" cols="33" maxLength="200" wrap="hard">
      </textarea>
      {vitals
        ? <Vitals vitals={this.state.vitals} />
        : <div className='container' textAlign='center'> loading... </div>
      }
      <h3>Objective</h3>
      <textarea id="objective" name="objective" rows="3" cols="33" maxLength="200" wrap="hard">
      </textarea>
      <h3>Plan</h3>
      <textarea id="plan" name="plan" rows="3" cols="33" maxLength="200" wrap="hard">
      </textarea>
      <h3>Summary</h3>
      <textarea id="doctor_summary" name="doctor_summary" rows="3" cols="33" maxLength="200" wrap="hard">
      </textarea>
      <br />
      <button type="submit" className="btn btn-primary">Sumbit</button>
      </form>
    </div>
  }
}

export default EMR
