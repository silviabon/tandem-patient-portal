import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home.jsx'
import EMR from './components/EMR.jsx'
import Login from './components/Login.jsx'
import Navbar from './components/Navbar.jsx'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patient: '',
      provider: 1
    }
    // this.updateApptDate = this.updateApptDate.bind(this)
    // this.newAppointment = this.newAppointment.bind(this)
    // this.updatePatientInState = this.updatePatientInState.bind(this)
    // this.updateConditionsInState = this.updateConditionsInState.bind(this)
    this.updateCompletedAppointmentsInState = this.updateCompletedAppointmentsInState.bind(this)
    this.updateUpcomingAppointmentsInState = this.updateUpcomingAppointmentsInState.bind(this)
    this.updatePatientsInState = this.updatePatientsInState.bind(this)
  }

  componentDidMount() {
    console.log("cdm on emr app")
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  // updateApptDate(newDate, newTime) {
  //   this.setState({
  //     apptDate: newDate,
  //     apptTime: newTime
  //   });
  // }

  // updatePatientInState(patient) {
  //   this.setState({
  //     patient
  //   });
  // }

  updatePatientsInState(patients) {
    this.setState({
      patients
    });
  }

  // updateConditionsInState(conditions) {
  //   this.setState({
  //     conditions
  //   });
  // }

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

  // newAppointment(calendar, questionnaire) {
  //   let body = {
  //     appointment: {
  //       patient_id: this.state.patient.id,
  //       provider_id: this.state.patient.provider_id,
  //       date: calendar.date,
  //       time: calendar.time,
  //       concern: questionnaire.concern,
  //       condition_id: 1,
  //       patient_summary: `Appointment type: ${questionnaire.apptType}, Main concern: ${questionnaire.concern}, Concern description: ${questionnaire.concernDescription}, Symptoms: ${questionnaire.symptoms}, Other symptoms: ${questionnaire.otherSymptoms}, Vitals - Temperature: ${questionnaire.temperature}, Heart Rate: ${questionnaire.heartrate}, Blood Pressure: ${questionnaire.bp_s}/${questionnaire.bp_d}, Question 1: ${questionnaire.question1}, Question 2: ${questionnaire.question2}`,
  //       apt_type: questionnaire.apptType,
  //       concern_desc: questionnaire.concern,
  //       symptoms: questionnaire.symptoms,
  //       other_symptoms: questionnaire.otherSymptoms,
  //       temp: questionnaire.temperature,
  //       heart_rate: questionnaire.heartrate,
  //       bp: `${questionnaire.bp_s}/${questionnaire.bp_d}`,
  //       q1: questionnaire.question1,
  //       q2: questionnaire.question2,
  //       status: 'upcoming'
  //     }
  //   }

  //   console.log("mi cuerpito", body )

  //   axios.post(`/api/patients/${this.state.patient.id}/appointments`, body )
  //   .then(res => {
  //     console.log("res in app newApp", res)
  //     console.log("data", res.data)
  //     let qppt = res.data
  //     let up = this.state.upcomingAppointments
  //     up.push(qppt)
  //     this.updateUpcomingAppointmentsInState(up)
  //   })
  // }

  render () {
    return <div>
    <Navbar patient={this.state.patient}/>
    <Router>
      <Switch>
        {/* <Route path='/' exact render={(props)=><Home updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} deleteAppointment={this.deleteAppointment} patient={this.state.patient} upcomingAppointments={this.state.upcomingAppointments} completedAppointments={this.state.completedAppointments}  {...props}/>} />
        <Route path='/home'render={(props)=><Home updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} deleteAppointment={this.deleteAppointment}  patient={this.state.patient} upcomingAppointments={this.state.upcomingAppointments} completedAppointments={this.state.completedAppointments} {...props}/>} />
        <Route path='/login' render={()=><Login updatePatientInState={this.updatePatientInState} updateConditionsInState={this.updateConditionsInState} updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} updateCompletedAppointmentsInState={this.updateCompletedAppointmentsInState}  />} />
        <Route path='/appointment' render={(props)=><AppointmentPage patient={this.state.patient} {...props}/>} /> */}
        {/* <Route path='/' render={(props)=><Login updatePatientsInState={this.updatePatientsInState} {...props} />} /> */}
        <Route path='/emr' render={(props)=><EMR patient={this.state.patient} upcomingAppointments={this.state.upcomingAppointments} completedAppointments={this.state.completedAppointments} {...props}/>} />
        <Route path='/home' render={(props)=><Home provider={this.state.provider} patients={this.state.patients} updatePatientInState={this.updatePatientInState} updateConditionsInState={this.updateConditionsInState} updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} updateCompletedAppointmentsInState={this.updateCompletedAppointmentsInState} {...props} />} />
        <Route path='/login' render={(props)=><Login updatePatientsInState={this.updatePatientsInState} {...props} />} />
      </Switch>
    </Router>
    </div>
  }
}

export default App
