import React, { Component } from 'react'
import { Container, Button, Input, Form, Label, Header, Segment, Grid, List, Loader, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Vitals from './Vitals.jsx';
import PropTypes from 'prop-types'
import axios from 'axios'

class EMR extends Component {
  constructor() {
    super()
    this.state = {
    }
    this.readFile = this.readFile.bind(this)
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

  readFile() {
    const file = document.getElementById('doctorfile').files[0]
    this.setState({ doctorfile: file })
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
    let body = new FormData();
    body.append('doctor_summary', event.target.doctor_summary.value)
    body.append('doctorfile', this.state.doctorfile)
    axios.post(`http://localhost:3001/api/patients/${this.state.patient.id}/appointments/${this.state.appointment.id}/soaps/`, body)
      .then(() => { this.context.router.history.push(`/home`); return null })
  }

  render() {
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
                {this.state.appointment.file.url
                  ? <div><p><b>Document Upload</b></p>
                    <p><a href={'http://localhost:3001/' + this.state.appointment.file.url} target='_blank'><img src='https://png.icons8.com/ios/2x/document.png' /></a></p></div>
                  : <div></div>
                }
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
          <Header as='h3' dividing>Assessment</Header>
          <textarea id="plan" name="plan" rows="3" cols="33" maxLength="200" wrap="hard">
          </textarea>
          <Header as='h3' dividing>Plan</Header>
          <textarea id="plan" name="plan" rows="3" cols="33" maxLength="200" wrap="hard">
          </textarea>
          <Header as='h3' dividing>Summary</Header>
          <TextArea name='doctor_summary'></TextArea>
          <br /><br />
          <label for="exampleFormControlFile1">Please upload your file</label>
          <input type="file" className="form-control-file" id="doctorfile" name="doctorfile" onChange={this.readFile}></input>
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
