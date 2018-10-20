import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Appointment from './components/Appointment'
import EMR from './components/EMR'
import Calendar from './components/Calendar'
import Questionnaire from './components/Questionnaire'
import Confirmation from './components/Confirmation'

class App extends Component {
  render () {
    return<Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/appointment' component={Appointment} />
        <Route path='/emr' component={EMR} />
        <Route path='/bookingCalendar' component={Calendar} />
        <Route path='/bookingQuestionnaire' component={Questionnaire} />
        <Route path='/bookingConfirmation' component={Confirmation} />
      </Switch>
    </Router>
  }
}

export default App