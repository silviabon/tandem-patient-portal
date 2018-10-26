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
    // this.getPatients = this.getPatients.bind(this)
    // this.getPatient = this.getPatient.bind(this)
    this.updatePatientInState = this.updatePatientInState.bind(this)
    this.updateConditionsInState = this.updateConditionsInState.bind(this)
  }

  
  componentDidMount() {
    console.log("cdm on app")
    // this.getConditions()
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

  newAppointment(calendar, questionnaire) {
    let body = JSON.stringify({
      appointment: {
        patient_id: this.state.patient.id,
        provider_id: this.state.patient.provider_id,
        date: calendar.date,
        time: calendar.time,
        concern: questionnaire.concern,
        condition_id: 1,
        patient_summary: `Appointment type: ${questionnaire.apptType}, Main concern: ${questionnaire.concern}, Concern description: ${questionnaire.concernDescription}, Symptoms: ${questionnaire.symptoms}, Other symptoms: ${questionnaire.otherSymptoms}, Vitals - Temperature: ${questionnaire.temperature}, Heart Rate: ${questionnaire.heartrate}, Blood Pressure: ${questionnaire.bp_s}/${questionnaire.bp_d}, Question 1: ${questionnaire.question1}, Question 2: ${questionnaire.question2}`,
        status: 'upcoming'
      }
    })

    fetch(`/api/patients/${this.state.patient.id}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {
      return response.json()
    })
  }

  // getPatients() {
  //   this.fetch('/api/patients')
  //     .then(patients => {
  //       this.getPatient(patients[0].id)
  //       this.getConditions(patients[0].id)
  //     })
  // }

  // getPatient(id) {
  //   this.fetch(`/api/patients/${id}`)
  //     .then(patient => this.setState({
  //       patient: patient
  //     }))
  // }

  // getConditions() {
  //   this.fetch(`/api/patients/${this.state.patient.id}/conditions`)
  //   // this.fetch(`/api/patients/7/conditions`)
  //   .then(conditions => {
  //       this.setState({
  //         conditions: conditions
  //       })
  //     })
  // }

  render () {
    // let cond = this.getConditions() 
    return <div>
    <Navbar patient={this.state.patient}/>
    <Router>
      <Switch>
        <Route path='/' exact render={(props)=><Home deleteAppointment={this.deleteAppointment} patient={this.state.patient} {...props}/>} />
        <Route path='/home'render={(props)=><Home patient={this.state.patient} {...props}/>} />
        <Route path='/login' render={()=> <Login updatePatientInState={this.updatePatientInState} updateConditionsInState={this.updateConditionsInState} />}/>
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
