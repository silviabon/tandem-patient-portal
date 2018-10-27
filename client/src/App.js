import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import AppointmentPage from './components/AppointmentPage.jsx'
import EMR from './components/EMR.jsx'
import EMRHome from './components/EMRHome.jsx'
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
      redirect: false
    }
    this.updateApptDate = this.updateApptDate.bind(this)
    this.newAppointment = this.newAppointment.bind(this)
    this.updatePatientInState = this.updatePatientInState.bind(this)
    this.updateConditionsInState = this.updateConditionsInState.bind(this)
    this.updateCompletedAppointmentsInState = this.updateCompletedAppointmentsInState.bind(this)
    this.updateUpcomingAppointmentsInState = this.updateUpcomingAppointmentsInState.bind(this)
  }


  componentDidMount() {
    console.log("cdm on app")
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

  newAppointment(calendar, questionnaire) {
    let body = {
      appointment: {
        patient_id: this.state.patient.id,
        provider_id: this.state.patient.provider_id,
        date: calendar.date,
        time: calendar.time,
        concern: questionnaire.concern,
        condition_id: 1,
        patient_summary: `Appointment type: ${questionnaire.apptType}, Main concern: ${questionnaire.concern}, Concern description: ${questionnaire.concernDescription}, Symptoms: ${questionnaire.symptoms}, Other symptoms: ${questionnaire.otherSymptoms}, Vitals - Temperature: ${questionnaire.temperature}, Heart Rate: ${questionnaire.heartrate}, Blood Pressure: ${questionnaire.bp_s}/${questionnaire.bp_d}, Question 1: ${questionnaire.question1}, Question 2: ${questionnaire.question2}`,
        app_type: questionnaire.apptType,
        concern_desc: questionnaire.concern,
        symptoms: `${questionnaire.symptoms}`,
        other_symptoms: questionnaire.otherSymptoms,
        temp: questionnaire.temperature,
        heart_rate: questionnaire.heartrate,
        bp: `${questionnaire.bp_s}/${questionnaire.bp_d}`,
        q1: questionnaire.question1,
        q2: questionnaire.question2,
        status: 'upcoming'
      }
    }

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
        <Route path='/' exact render={(props)=><Home updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} deleteAppointment={this.deleteAppointment} patient={this.state.patient} upcomingAppointments={this.state.upcomingAppointments} completedAppointments={this.state.completedAppointments}  {...props}/>} />
        <Route path='/home'render={(props)=><Home updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} deleteAppointment={this.deleteAppointment}  patient={this.state.patient} upcomingAppointments={this.state.upcomingAppointments} completedAppointments={this.state.completedAppointments} {...props}/>} />
        <Route path='/login' render={()=><Login updatePatientInState={this.updatePatientInState} updateConditionsInState={this.updateConditionsInState} updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} updateCompletedAppointmentsInState={this.updateCompletedAppointmentsInState}  />} />
        <Route path='/appointment' render={(props)=><AppointmentPage patient={this.state.patient} {...props}/>} />
        <Route path='/emr' render={(props)=><EMR patient={this.state.patient} {...props}/>} />
        <Route path='/emrhome' component={EMRHome} />
        <Route path='/bookingCalendar' render={()=><Calendar formattedDate={this.formattedDate} renderFormattedDateLabel={this.renderFormattedDateLabel} apptDate={this.state.apptDate} apptTime={this.state.apptTime} updateApptDate={this.updateApptDate}/>}/>
        <Route path='/bookingQuestionnaire' render={(props)=><Questionnaire formattedDate={this.formattedDate} newAppointment={this.newAppointment} handleQuestionChange={this.handleQuestionChange} updateQuestionnaire={this.updateQuestionnaire} handleQuestionSubmit={this.handleQuestionSubmit} conditions={this.state.conditions} apptDate={this.state.apptDate} apptTime={this.state.apptTime} {...props}/>}/>
      </Switch>
    </Router>
    </div>
  }
}

export default App
