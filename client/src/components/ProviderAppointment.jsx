import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProviderAppointment extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    this.getProvider(this.props.appointment.provider_id)
    this.setState({patient: this.props.appointment.patient_id})
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getProvider(provider) {
    this.fetch(`/api/providers/${provider}`)
      .then(provider => this.setState({ provider: provider }))
  }

  render() {
    const appt = this.props.appointment
    const status = this.props.status
    let { provider, patient } = this.state
    let link = `emr/${this.props.appointment.id}`
    return provider && patient
      ? (
        <div className='card'>
          <h5 className='card-header'>Main Concern:{appt.concern}</h5>
          <div className='card-body'>
            <p>Date:{appt.date}</p>
            <p>Time:{appt.time}</p>
            <p>Doctor:{provider.last_name}</p>
          </div>
            {status === "upcoming"
              ? <span>
                <Link to={{ pathname: link, state: { appointment: { appt }, patient: { patient } } }}><button className='btn btn-primary aptbtn'>See patient</button></Link>
                </span>
              : <Link to={{ pathname: link, state: { appointment: { appt }, patient: { patient } } }}><button className='btn btn-primary aptbtn'>Details</button></Link>
            }
        </div>
      )
      : <div className='container'>
        <p>Loading...</p>
      </div>
  }
}

export default ProviderAppointment
