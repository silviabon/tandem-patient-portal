import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

class Appointment extends Component {
  constructor() {
    super()
    this.state = {
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.getProvider(this.props.appointment.provider_id)
    this.getCondition(this.props.appointment.patient_id, this.props.appointment.condition_id)
    this.setState({ patient: this.props.appointment.patient_id })
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

  getCondition(patientId, conditionId) {
    axios.get(`/api/patients/${patientId}/conditions/${conditionId}`)
      .then(res => {
        let condition = res.data;
        this.setState({ condition: condition.name })
      })
  }

  handlePageChange() {
    setTimeout(() => {
      window.location = '/'
    }, 2000)
  }

  render() {
    const appt = this.props.appointment
    const status = this.props.status
    let { provider, patient, condition } = this.state
    let link = `appointment/${this.props.appointment.id}`
    const onDeleteAppt = e => {
      e.preventDefault()
      let aptid = this.props.appointment.id
      this.props.deleteAppointment(aptid)
    }
    const onUpdateAppt = e => {
      e.preventDefault()
      this.props.updateAppointmentInState(this.props.appointment)
      this.context.router.history.push(`/bookingCalendar`)
    }
    return provider && patient
      ? (
        <div className='card'>
          <div className='card-body appt-card'>
            <div className='row'>
              <div className='col-md-7 time-col'><p>{condition
                ? <span className='condition'>{condition}</span>
                : <span></span>
              }<span className='concern'>{appt.concern}</span> </p>
                <p className='appt-time'>{appt.date} at {appt.time} with Doctor {provider.last_name}</p></div>
              {status === "upcoming"
                ? <div className='col-sm-4 detail-button'>
                  <Link to={{ pathname: link, state: { appointment: { appt }, patient: { patient } } }}>
                    <button className='btn aptbtn-more'> Details</button>
                  </Link>

                  <button className="btn aptbtn-more" onClick={onUpdateAppt}>Update</button>
                  <a className='btn' onClick={onDeleteAppt}>
                    <img src="https://cdn4.iconfinder.com/data/icons/devine_icons/128/PNG/Folder%20and%20Places/Trash-Recyclebin-Empty-Closed.png" width='30' height='30' className='trash' />
                  </a>
                </div>
                : <div className='col-md-4 detail-button'><Link to={{ pathname: link, state: { appointment: { appt }, patient: { patient } } }}><button className='btn aptbtn-more'>Details</button></Link>
                </div>
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

