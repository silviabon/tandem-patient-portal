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
          <h3 className='card-header'>{appt.concern}</h3>
          <div className='card-body'>
            <div className='row'>
            <div className='col-9 time-col'><p className='appt-time'>{appt.date} at {appt.time}AM with Doctor {provider.last_name}</p></div>

            {status === "upcoming"
              ? <div className='col-2 delete-button'>
                <button className="btn btn-primary aptbtn" onClick={onDeleteAppt}>Delete</button>
                </div>
              : <div className='col-2 detail-button'><Link to={{ pathname: link, state: { appointment: { appt }, patient: { patient } } }}><button className='btn btn-primary aptbtn'>Details</button></Link></div>
            }
         </div>
          </div>
        </div>

      )
      : <div className='container'>
        <p>Loading...</p>
      </div>
  }
}

export default Appointment
