import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Appointment from './components/Appointment'
import EMR from './components/EMR'
import Calendar from './components/Calendar'
import Questionnaire from './components/Questionnaire'
import Confirmation from './components/Confirmation'
import Navbar from './components/Navbar'

class App extends Component {
  constructor(props) {
    super(props)


    this.state = {
      apptDate: '2018-10-22',
      apptTime: '5pm',
      patient: ''
    }
    this.updateApptDate = this.updateApptDate.bind(this)
    this.newAppointment = this.newAppointment.bind(this)
    this.getPatients = this.getPatients.bind(this)
    this.getPatient = this.getPatient.bind(this)
    this.updateQuestionnaire = this.updateQuestionnaire.bind(this)
  };

   componentDidMount() {
     this.getPatients()
   }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }


  updateApptDate(newDate, newTime) {
    this.setState({apptDate: newDate, apptTime: newTime});
  }

  newAppointment(patient, date, time) {
    console.log('patient', patient)
    console.log('date', date)
    console.log('time', time)
    let body = JSON.stringify({appointment: {patient_id: patient.id, date: date, time: time }})

    fetch(`http://localhost:3001/api/patients/${patient.id}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})
  }


    getPatients() {
      this.fetch('/api/patients')
        .then(patients => {
          this.getPatient(patients[0].id)
          this.getConditions(patients[0].id)
        })
    }

    getPatient(id) {
      this.fetch(`/api/patients/${id}`)
        .then(patient => this.setState({
          patient: patient
        }))
    }

    getConditions(id) {
      this.fetch(`/api/patients/${id}/conditions`)
      .then(conditions => {
        this.setState({ conditions: conditions })
      })
    }

    updateQuestionnaire(questionnaire) {
      this.setState({ apptType: questionnaire.apptType,
      conditionType: questionnaire.conditionType,
      concernDescription: questionnaire.concernDescription,
      symptoms: questionnaire.symptoms,
      otherSymptoms: questionnaire.otherSymptoms,
      temperature: questionnaire.temperature,
      heartrate: questionnaire.heartrate,
      bp_s: questionnaire.bp_s,
      bp_d: questionnaire.bp_d,
      question1: questionnaire.question1,
      question2: questionnaire.question2 })
      console.log(this.state)
    }


    // updateQuestions(type, condition, text) {
    //   this
    // }





  render () {


    return<div>
    <Navbar patient={this.state.patient}/>
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/home' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/appointment' component={Appointment} />
        <Route path='/emr' component={EMR} />
        <Route path='/bookingCalendar' render={()=><Calendar apptDate={this.state.apptDate} apptTime={this.state.apptTime} updateApptDate={this.updateApptDate}/>}/>
        <Route path='/bookingConfirmation' render={(props)=><Confirmation newAppointment={this.newAppointment} patient={this.state.patient} apptDate={this.state.apptDate} apptTime={this.state.apptTime} {...props}/>}/> />
        <Route path='/bookingQuestionnaire' render={(props)=><Questionnaire handleQuestionChange={this.handleQuestionChange} updateQuestionnaire={this.updateQuestionnaire} handleQuestionSubmit={this.handleQuestionSubmit} conditions={this.state.conditions} apptDate={this.state.apptDate} apptTime={this.state.apptTime} {...props}/>}/>
      </Switch>
    </Router>
    </div>
  }
}

export default App