import React, { Component } from 'react'


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
    return <div className='container' textAlign='center'>
      <h3>Appointment</h3>
      {
        provider && summary && appointment
          ? <div className='container'>
            <div className='container'>
              <span>Date: </span><span>{appointment.date}</span><span>Time: </span><span>{appointment.time}</span><span>Dr.: </span><span>{provider.last_name}</span>
            </div>
            <div className='container'>
              <h3>Patient Summary:</h3>
              {appointment.patient_summary}
            </div>
            <div className='container'>
              <h3>Provider Summary and Instructions:</h3>
              {summary}
            </div>
          </div>
          : <p>Loading...</p>
      }
      <a className="btn btn-primary" href="/" role="button">Back Home</a>
    </div>
  }
}

export default AppointmentPage
