import React, { Component } from 'react'
import { Container, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Vitals from './Vitals.jsx';

class EMR extends Component {
  constructor() {
    super()
    this.state = {
      patient: 11
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault()
    alert('An form was submitted: ' + event.target.patient_summary.value + ' ' + event.target.subjective.value+ ' ' + event.target.objective.value+ ' ' + event.target.plan.value+ ' ' + event.target.doctor_summary.value)
    let body = JSON.stringify({soap: {doctor_summary: event.target.doctor_summary.value}})
    fetch('http://localhost:3001/api/patients/1/appointments/1/soaps/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body,
      }).then((response) => {return response.json()})
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
        ? <textarea id="patient_summary" name="patient_summary" rows="3" cols="33" maxLength="200" wrap="hard" value={this.state.appointment.patient_summary} readOnly></textarea>
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
      <Link to={{ pathname: '/emrhome' }} ><button type="submit" className="btn btn-primary" >Sumbit</button></Link>
      </form>
    </div>
  }
}

export default EMR
