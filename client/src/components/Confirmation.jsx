import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Confirmation extends Component {

  render () {
    const questionnaire = this.props.location.state
    const patient = this.props.patient
console.log("quest", questionnaire)

    const onBookingAppt = e => {
      e.preventDefault()
      this.props.newAppointment(questionnaire)
    }

    return <Container text textAlign='center'>
      <h1>Confirmation Page</h1>
      <form onSubmit={onBookingAppt}>
      <h1>Patient Name: {patient.first_name}</h1>
      <h1>Appointment Date: {questionnaire.date}</h1>
      <h1>Appointment Time: {questionnaire.time}</h1>
      <button type='submit'>Book Appointment</button>
      </form>
    </Container>
  }
}

export default Confirmation