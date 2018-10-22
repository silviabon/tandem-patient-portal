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

      patient: '',
      conditions: []
    }
    this.updateApptDate = this.updateApptDate.bind(this);
    this.getPatients = this.getPatients.bind(this)
    this.getPatient = this.getPatient.bind(this)
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
    //console.log(this.state)
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
        <Route path='/bookingQuestionnaire' render={(props)=><Questionnaire conditions={this.state.conditions} apptDate={this.state.apptDate} apptTime={this.state.apptTime} {...props}/>}/>
        <Route path='/bookingConfirmation' component={Confirmation} />
      </Switch>
    </Router>
    </div>
  }
}

export default App