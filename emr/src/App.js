import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home.jsx'
import EMR from './components/EMR.jsx'
import EMRPrevious from './components/EMRPrevious.jsx'
import Login from './components/Login.jsx'
import Navbar from './components/Navbar.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patient: '',
      provider: 1
    }
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

  updatePatientsInState(patients) {
    this.setState({
      patients
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

  render () {
    return <div>
    <Navbar/>
    <Router>
      <Switch>
        {/* <Route path='/' exact render={(props)=><Home updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} deleteAppointment={this.deleteAppointment} patient={this.state.patient} upcomingAppointments={this.state.upcomingAppointments} completedAppointments={this.state.completedAppointments}  {...props}/>} />
        <Route path='/home'render={(props)=><Home updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} deleteAppointment={this.deleteAppointment}  patient={this.state.patient} upcomingAppointments={this.state.upcomingAppointments} completedAppointments={this.state.completedAppointments} {...props}/>} />
        <Route path='/login' render={()=><Login updatePatientInState={this.updatePatientInState} updateConditionsInState={this.updateConditionsInState} updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} updateCompletedAppointmentsInState={this.updateCompletedAppointmentsInState}  />} />
        <Route path='/appointment' render={(props)=><AppointmentPage patient={this.state.patient} {...props}/>} /> */}
        {/* <Route path='/' render={(props)=><Login updatePatientsInState={this.updatePatientsInState} {...props} />} /> */}
        <Route path='/emr' render={(props)=><EMR patient={this.state.patient} upcomingAppointments={this.state.upcomingAppointments} completedAppointments={this.state.completedAppointments} {...props}/>} />
        <Route path='/emrp' render={(props)=><EMRPrevious patient={this.state.patient} upcomingAppointments={this.state.upcomingAppointments} completedAppointments={this.state.completedAppointments} {...props}/>} />
        <Route path='/home' render={(props)=><Home provider={this.state.provider} patients={this.state.patients} updatePatientInState={this.updatePatientInState} updateConditionsInState={this.updateConditionsInState} updateUpcomingAppointmentsInState={this.updateUpcomingAppointmentsInState} updateCompletedAppointmentsInState={this.updateCompletedAppointmentsInState} {...props} />} />
        <Route path='/login' render={(props)=><Login updatePatientsInState={this.updatePatientsInState} {...props} />} />
      </Switch>
    </Router>
    </div>
  }
}

export default App
