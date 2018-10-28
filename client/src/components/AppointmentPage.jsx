import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AppointmentPage extends Component {
  constructor() {
    super()
    this.state = {
      numPages: null,
      pageNumber: 1,
    }
  }

  componentDidMount() {
    this.getSummary(this.props.location.state.appointment.appt.id, this.props.location.state.patient.patient)
    this.getProvider(this.props.location.state.appointment.appt.provider_id)
    this.setState({ appointment: this.props.location.state.appointment.appt })
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
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
    const { pageNumber, numPages } = this.state;
    let { provider, summary, appointment } = this.state
    return <div className='row'>
      <div className='col-md-8 main'>
        <div className='row'>
      <h2>Appointment Summary</h2>
      {
        provider && summary && appointment
          ? <div className='col-md-12'>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
              <p>Doctor: {provider.last_name}</p>
              <h3>Patient Summary:</h3>
              <p>Type: {appointment.app_type}</p>
              <p>Concern: {appointment.concern}</p>
              <p>Description: {appointment.concern_desc}</p>
              <p>Symptoms: {appointment.symptoms}</p>
              <p>Other symptoms: {appointment.other_symptoms}</p>
              <p>Vitals</p>
              <p>Temperature: {appointment.temp}</p>
              <p>Heart rate: {appointment.heart_rate}</p>
              <p>Blood Pressure: {appointment.bp}</p>
              <p>Question 1: {appointment.q1}</p>
              <p>Question 2: {appointment.q2}</p>
              <p>Document Uploads: </p>
              {appointment.status === 'completed' &&
                <div>
              <h3>Provider Summary and Instructions:</h3>
              {summary}
      </div> }
            </div>
            : <div className='col-md-12'><p>Loading...</p></div>
      }
      <Link to={{ pathname: '/' }}><button className='btn btn-primary'>Back Home</button></Link>
      </div>
      </div>
    </div>
  }
}

export default AppointmentPage
