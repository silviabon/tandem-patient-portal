import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Appointment extends Component {
  constructor() {
    super()
    this.state = {
    }
    this.handlePageChange = this.handlePageChange.bind(this)
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

  handlePageChange() {
    setTimeout(() => {
      window.location = '/'
    }, 2000);
  }

  render() {
    const appt = this.props.appointment
    const status = this.props.status
    let { provider, patient } = this.state
    let link = `appointment/${this.props.appointment.id}`
    const onDeleteAppt = e => {
      e.preventDefault()
      let aptid = this.props.appointment.id
      this.props.deleteAppointment(aptid)
    }
    return provider && patient
      ? (
        <div className='card'>
          <h3 className='card-header'>Main Concern - <b>{appt.concern}</b> </h3>
          <div className='card-body'>
            <p>Date: <b>{appt.date}</b></p>
            <p>Time: <b>{appt.time}</b></p>
            <p>Doctor: <b>{provider.last_name}</b></p>
          </div>
            {status === "upcoming"
              ? <span>
                <button className="btn btn-primary aptbtn" onClick={onDeleteAppt}>Delete</button>
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

export default Appointment
