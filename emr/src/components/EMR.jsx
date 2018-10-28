import React, { Component } from 'react'
import { Container, Button, Input, Form, Label, Header, Segment, Grid, List, Loader, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Vitals from './Vitals.jsx';
import PropTypes from 'prop-types'

class EMR extends Component {
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
    console.log("current Appointment", currentAppointment)
    this.props.upcomingAppointments.forEach(app => {
      console.log("id p[]", app.id)
      if( app.id == currentAppointment) {
        theOne = app
      }         
      console.log("app", theOne)
    });
    // let theOne = this.props.upcomingAppointments.filter(app => app.id == currentAppointment)
    console.log("theone[]", theOne.patient_id)
    this.getAppointment(theOne.patient_id, currentAppointment)
    this.getVitalsInfo(theOne.patient_id)
    this.getPatientInfo(theOne.patient_id)

    // this.getSummary(this.props.location.state.appointment.appt.id, this.props.location.state.patient.patient)
    // this.getProvider(this.props.location.state.appointment.appt.provider_id)
    // this.setState({ appointment: this.props.location.state.appointment.appt })
    // this.getSOAP(this.props.appointment.provider_id)
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getVitalsInfo(patient) {
    // this.fetch(`/api/patients/${this.props.location.state.patient}/vitals`)
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
    console.log(`about to save patient is ${this.state.patient.id} appointment is ${this.state.appointment.id}` )
    event.preventDefault()
    alert('An form was submitted')
    let body = JSON.stringify({soap: {doctor_summary: event.target.doctor_summary.value}})
    fetch(`http://localhost:3001/api/patients/${this.state.patient.id}/appointments/${this.state.appointment.id}/soaps/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body,
      }).then((response) => { this.context.router.history.push(`/home`); return response.json()})
  }

  render () {
    let { vitals, appointment, patient } = this.state
    return (
      <Container>
        <br />
        {patient
          ? <Header as='h2'>Patient name: {patient.first_name} {patient.last_name}</Header>
          : <Container><Loader active inline /></Container>
        }
        <Header as='h3' dividing>Patient summary</Header>
        <Form onSubmit={this.handleSubmit}>
        {appointment
            ? <Container>
                <Segment>
                  <p><Label horizontal>Appointment type:</Label> {this.state.appointment.app_type}</p>
                  <p><Label horizontal>Concern:</Label> {this.state.appointment.concern}</p>
                  <p><Label horizontal>Description:</Label> {this.state.appointment.concern_desc}</p>
                  <p><Label horizontal>Symptoms:</Label> {this.state.appointment.symptoms}</p>
                  <p><Label horizontal>Other symptoms:</Label> {this.state.appointment.other_symptoms}</p>
                  <p><Label horizontal>Question 1:</Label> {this.state.appointment.q1}</p>
                  <p><Label horizontal>Question 2:</Label> {this.state.appointment.q2}</p>
                  <input type="hidden" name='appt_num' value={this.state.appointment.id}></input>
                </Segment>
            </Container>
          : <Container><Loader active inline /></Container>
        }
        <Header as='h3' dividing>Patient Vitals</Header>
        {vitals
          ? <Vitals vitals={this.state.vitals} />
          : <Container><Loader active inline /></Container>
        }
        <Header as='h3' dividing>Subjective</Header>
        <textarea id="subjective" name="subjective" rows="3" cols="33" maxLength="200" wrap="hard">
        </textarea>
        <Header as='h3' dividing>Objective</Header>
        <textarea id="objective" name="objective" rows="3" cols="33" maxLength="200" wrap="hard">
        </textarea>
        <Header as='h3' dividing>Plan</Header>
        <textarea id="plan" name="plan" rows="3" cols="33" maxLength="200" wrap="hard">
        </textarea>
        <Header as='h3' dividing>Summary</Header>
        <TextArea name='doctor_summary'></TextArea>
        <br /><br />
        <Button primary type="submit">Save patient visit information</Button>
        </Form>
        <br />
        <Link to={{ pathname: '/home' }} ><Button color='olive'>Back</Button></Link>
        <br /><br />
      </Container>
    )
  }
}

export default EMR
