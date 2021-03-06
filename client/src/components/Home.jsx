import React, { Component } from 'react'
import AppointmentList from './AppointmentList.jsx'
import MedicalInfo from './MedicalInfo.jsx'
import PropTypes from 'prop-types'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.deleteAppointment = this.deleteAppointment.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  redirectToTarget = () => {
    this.context.router.history.push(`/login`)
  }

  componentDidMount() {
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
    confirmAlert({
      title: 'Delete appointment',
      message: 'Are you sure you want to delete this appointment?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            fetch(`/api/patients/${this.props.patient.id}/appointments/${id}`, {
              method: 'DELETE',
            }).then(() => {
              const appt = this.props.upcomingAppointments
              const newAppt = appt.filter(app => app.id !== id)
              this.props.updateUpcomingAppointmentsInState(newAppt)
            })
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    })
  }

  render() {
    let { completedAppointments, upcomingAppointments } = this.props
    const onNewAppt = e => {
      e.preventDefault()

      confirmAlert({
        title: 'Attention!',
        message: 'If you are experiencing severe symptoms please call 911 or go to your nearest emergency room',
        buttons: [
          {
            label: 'Continue',
            onClick: () => {
              
              this.context.router.history.push(`/bookingCalendar`)
            }
          },
          {
            label: 'Cancel',
            onClick: () => {}
          }
        ]
      })

      // if (upcomingAppointments.length > 0) {
      //   this.props.updateAppointmentInState('')
      // }

      // this.context.router.history.push(`/bookingCalendar`)
    }
    return (
      <div className='row'>
        <div className='col-md-8 main'>
          <div className='row'>
            <div className='col-md-8'>
              <button className="btn book-apt" onClick={onNewAppt}>Book Appointment</button>
              <h1>Upcoming Appointments</h1>
              {upcomingAppointments && upcomingAppointments.length
                ? (<AppointmentList deleteAppointment={this.deleteAppointment} appointments={this.props.upcomingAppointments} updateAppointmentInState={this.props.updateAppointmentInState} patient={this.props.patient} status={'upcoming'} />)
                : <div className='container'>No appointments found.</div>}
              <h1>Previous Appointments</h1>
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
