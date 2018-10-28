import React, { Component } from 'react'
import AppointmentList from './AppointmentList.jsx'
import MedicalInfo from './MedicalInfo.jsx'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.deleteAppointment=this.deleteAppointment.bind(this)
    this.updateAppointment=this.updateAppointment.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  redirectToTarget = () => {
    this.context.router.history.push(`/login`)
  }

  componentDidMount() {
      console.log("props on Home", this.props.patient)
      if (!this.props.patient) {
        this.context.router.history.push(`/login`)
      }
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  deleteAppointment = (id) => {
    fetch(`/api/patients/${this.props.patient.id}/appointments/${id}`, {
      method: 'DELETE',
    }).then(() => {
      const appt = this.props.upcomingAppointments
      const newAppt = appt.filter(app => app.id !== id)
      this.props.updateUpcomingAppointmentsInState(newAppt)
    })
  }

  updateAppointment = (id) => {
    fetch(`/api/patients/${this.props.patient.id}/appointments/${id}`, {
      method: 'PUT',
    }).then(() => {
      const appt = this.props.upcomingAppointments
      const newAppt = appt.filter(app => app.id !== id)
      this.props.updateUpcomingAppointmentsInState(newAppt)
    })
  }


  render() {
    let { completedAppointments, upcomingAppointments } = this.props
    const onNewAppt = e =>{
      e.preventDefault()
      this.props.updateAppointmentInState(undefined)
       this.context.router.history.push(`/bookingCalendar`)
    }
    return (
        <div className='row'>
          <div className='col-md-8 main'>
          <div className='row'>
            <div className='col-md-8'>
            <button className="btn book-apt" onClick={onNewAppt}>Book Appointment</button>
          <h2>Upcoming Appointments</h2>
          {upcomingAppointments && upcomingAppointments.length
              ? (<AppointmentList deleteAppointment={this.deleteAppointment} appointments={this.props.upcomingAppointments} updateAppointmentInState={this.props.updateAppointmentInState} patient={this.props.patient} status={'upcoming'} />)
            : <div className='container'>No appointments found.</div>}
          <h2>Previous Appointments</h2>
          {completedAppointments && completedAppointments.length
            ? <AppointmentList appointments={this.props.completedAppointments} status={'completed'} />
            : <div className='container'>No appointments found.</div>}
          </div>
          <div className='col-md-4'>
            <MedicalInfo patient={this.props.patient} />
            </div>
          </div>
          </div>
        </div>
    )
  }
}

export default Home
