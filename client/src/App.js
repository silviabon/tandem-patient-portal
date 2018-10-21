import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Appointment from './components/Appointment.jsx'
import EMR from './components/EMR'
import Calendar from './components/Calendar'
import Questionnaire from './components/Questionnaire'
import Confirmation from './components/Confirmation'
import Navbar from './components/Navbar'

class App extends Component {
  render () {
    return<div>
    <Navbar />
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/home' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/appointment' component={Appointment} />
        <Route path='/emr' component={EMR} />
        <Route path='/bookingCalendar' component={Calendar} />
        <Route path='/bookingQuestionnaire' component={Questionnaire} />
        <Route path='/bookingConfirmation' component={Confirmation} />
      </Switch>
    </Router>
    </div>
  }
}

export default App