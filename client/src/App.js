import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import AppointmentPage from './components/AppointmentPage.jsx'
import Calendar from './components/Calendar.jsx'
import Questionnaire from './components/Questionnaire.jsx'
import Navbar from './components/Navbar.jsx'
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patient: '',
      conditions: '',
      appointment: '',
      redirect: false
    }
    this.updateApptDate = this.updateApptDate.bind(this)
    this.newAppointment = this.newAppointment.bind(this)
    this.updatePatientInState = this.updatePatientInState.bind(this)
    this.updateConditionsInState = this.updateConditionsInState.bind(this)
    this.updateCompletedAppointmentsInState = this.updateCompletedAppointmentsInState.bind(this)
    this.updateUpcomingAppointmentsInState = this.updateUpcomingAppointmentsInState.bind(this)
    this.updateAppointmentInState = this.updateAppointmentInState.bind(this)
    this.updateAppointment=this.updateAppointment.bind(this)
  }

  componentDidMount() {
    console.log("client cdm on app")
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  updateApptDate(newDate, newTime) {
    this.setState({
      apptDate: newDate,
      apptTime: newTime
    });
  }

  updatePatientInState(patient) {
    this.setState({
      patient
    });
  }

  updateConditionsInState(conditions) {
    this.setState({
      conditions
    });
  }

  updateCompletedAppointmentsInState(completedAppointments) {
    this.setState({
      completedAppointments
    });
  }

  updateUpcomingAppointmentsInState(upcomingAppointments) {
    this.setState({
      upcomingAppointments
    });
  }

  updateAppointmentInState(appointment) {
    this.setState({
      appointment
    });
  }

  updateAppointment = (appointment_id, date, time) => {
    let body = new FormData()
    body.append('date', date)
    body.append('time', time)
    axios.put(`/api/patients/${this.state.patient.id}/appointments/${appointment_id}`, body )
    .then(res => {
      console.log("res in updated appt App", res)
      axios.get(`/api/patients/${this.state.patient.id}/appointments/`)
        .then(res3  => {
          console.log("INSIDE SECOND AXIOS")
          let appointments = res3.data
          if (appointments.length) {
            const appts = appointments.filter(app => app.status === 'completed')
            this.updateCompletedAppointmentsInState(appts)
            appts = appointments.filter(app => app.status === 'upcoming')
            this.updateUpcomingAppointmentsInState(appts)
          }
        })
    })
  }

  newAppointment(calendar, questionnaire) {
    console.log("file", questionnaire.file)

    let body = new FormData();
    body.append('patient_id', this.state.patient.id)
    body.append('provider_id', this.state.patient.provider_id)
    body.append('date', calendar.date)
    body.append('time', calendar.time)
    body.append('condition_id', 1)
    body.append('app_type', questionnaire.apptType)
    body.append('concern', questionnaire.concern)
    body.append('concern_desc', questionnaire.concernDescription)
    body.append('symptoms', questionnaire.symptoms)
    body.append('other_symptoms', questionnaire.otherSymptoms)
    body.append('temp', questionnaire.temperature)
    body.append('heart_rate', questionnaire.heartrate)
    body.append('bp', `${questionnaire.bp_s}/${questionnaire.bp_d}`)
    body.append('q1', questionnaire.question1)
    body.append('q2', questionnaire.question2)
    body.append('file', questionnaire.file)
    body.append('status', 'upcoming')

    console.log("mi cuerpito", body )

    axios.post(`/api/patients/${this.state.patient.id}/appointments`, body )
    .then(res => {
      console.log("res in app newApp", res)
      console.log("data", res.data)
      let qppt = res.data
      let up = this.state.upcomingAppointments
      up.push(qppt)
      this.updateUpcomingAppointmentsInState(up)
    })
  }

  render () {
    return <div>
    <Navbar patient={this.state.patient}/>
    <Router>
      <Switch>
        <Route path='/' exact render={(props)=><Home updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} updateAppointmentInState={this.updateAppointmentInState} deleteAppointment={this.deleteAppointment}  patient={this.state.patient} upcomingAppointments={this.state.upcomingAppointments} deleteAppointment={this.deleteAppointment} patient={this.state.patient} upcomingAppointments={this.state.upcomingAppointments} completedAppointments={this.state.completedAppointments}  {...props}/>} />
        <Route path='/home'render={(props)=><Home updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} updateAppointmentInState={this.updateAppointmentInState} deleteAppointment={this.deleteAppointment}  patient={this.state.patient} upcomingAppointments={this.state.upcomingAppointments} completedAppointments={this.state.completedAppointments} {...props}/>} />
        <Route path='/login' render={()=><Login updatePatientInState={this.updatePatientInState} updateConditionsInState={this.updateConditionsInState} updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} updateCompletedAppointmentsInState={this.updateCompletedAppointmentsInState}  />} />
        <Route path='/appointment' render={(props)=><AppointmentPage patient={this.state.patient} {...props}/>} />
        <Route path='/bookingCalendar' render={()=><Calendar formattedDate={this.formattedDate} updateAppointment={this.updateAppointment} renderFormattedDateLabel={this.renderFormattedDateLabel} apptDate={this.state.apptDate} apptTime={this.state.apptTime} updateApptDate={this.updateApptDate} patient={this.state.patient} appointment = {this.state.appointment}/>}/>
        <Route path='/bookingQuestionnaire' render={(props)=><Questionnaire formattedDate={this.formattedDate} newAppointment={this.newAppointment} handleQuestionChange={this.handleQuestionChange} updateQuestionnaire={this.updateQuestionnaire} handleQuestionSubmit={this.handleQuestionSubmit} conditions={this.state.conditions} apptDate={this.state.apptDate} apptTime={this.state.apptTime} {...props}/>}/>
      </Switch>
    </Router>
    </div>
  }
}

export default App
