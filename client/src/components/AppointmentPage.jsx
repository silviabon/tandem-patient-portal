import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AppointmentPage extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    this.getSummary(this.props.location.state.appointment.appt.id, this.props.location.state.patient.patient)
    this.getProvider(this.props.location.state.appointment.appt.provider_id)
    this.setState({ appointment: this.props.location.state.appointment.appt })
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
    let { provider, summary, appointment } = this.state
    return <div className='row'>
      <div className='col-8 main'>
        <div className='row'>
      
      {
        provider && summary && appointment
          ? <div className='col-xs-12 card apptDetails'>
              <h2>Appointment details</h2>
              <p>Your appointment is on {appointment.date} at {appointment.time} with Dr.{provider.last_name} </p>
              <h3>Your Appointment Summary:</h3>
              <p><b>Type:</b> {appointment.app_type}</p>
              <p><b>Concern:</b> {appointment.concern}</p>
              <p><b>Description:</b> {appointment.concern_desc}</p>
              <p><b>Symptoms:</b> {appointment.symptoms} {appointment.other_symptoms}</p>
              <h3>Vitals</h3>
              <p><b>Temperature:</b> {appointment.temp}</p>
              <p><b>Heart rate:</b> {appointment.heart_rate}</p>
              <p><b>Blood Pressure:</b> {appointment.bp}</p>
              <p><b>Question 1:</b> {appointment.q1}</p>
              <p><b>Question 2:</b> {appointment.q2}</p>
              {appointment.status === 'completed' && 
                <div>
              <h3>Provider Summary and Instructions:</h3>
              {summary}
      </div> }
            </div>
            : <div className='col-md-12'><p>Loading...</p></div>
      }
      <Link to={{ pathname: '/' }}><button className='btn aptbtn-details'>Back Home</button></Link>
      </div>
      </div>
    </div>
  }
}

export default AppointmentPage
