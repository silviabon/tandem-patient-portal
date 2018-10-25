import React, { Component } from "react"
import { Container } from "semantic-ui-react"
import PropTypes from 'prop-types'

class Confirmation extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    const questionnaire = this.props.location.state
    const patient = this.props.patient

    const onBookingAppt = e => {
      e.preventDefault()
      this.props.newAppointment(questionnaire)
      this.context.router.history.push(`/home`)
    };

    return (
      <Container text textAlign="center">
        <h1>Confirmation Page</h1>
        <form onSubmit={onBookingAppt}>
          <h1>Patient Name: {patient.first_name}</h1>
          <h1>Appointment Date: {questionnaire.date}</h1>
          <h1>Appointment Time: {questionnaire.time}</h1>
          <button type="submit">Confirm Appointment</button>
        </form>
      </Container>
    );
  }
}

export default Confirmation
