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
        <div className='row'>
        <div className='col-md-5 main'>
        <h3>Confirmation Page</h3>
        <form onSubmit={onBookingAppt} className='form-group'>
          <p><b>Patient Name:</b> {patient.first_name}</p>
          <p><b>Appointment Date:</b> {questionnaire.date}</p>
          <p><b>Appointment Time:</b> {questionnaire.time}</p>
        <button className='btn btn-primary' type="submit">Confirm Appointment</button>
        </form>
        </div>
        </div>
      </Container>
    );
  }
}

export default Confirmation
