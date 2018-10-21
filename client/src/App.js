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
  constructor(props) {
    super(props)


    this.state = {
      apptDate: 'your moms house',
      apptTime: '5pm'
    }
    this.updateApptDate = this.updateApptDate.bind(this);
  };
  

  updateApptDate(newDate, newTime) {
    this.setState({apptDate: newDate, apptTime: newTime});
    //console.log(this.state)
  }

  

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
        <Route path='/bookingCalendar' render={()=><Calendar apptDate={this.state.apptDate} apptTime={this.state.apptTime} updateApptDate={this.updateApptDate}/>}/>
        <Route path='/bookingQuestionnaire' render={(props)=><Questionnaire apptDate={this.state.apptDate} apptTime={this.state.apptTime} {...props}/>}/>
        <Route path='/bookingConfirmation' component={Confirmation} />
      </Switch>
    </Router>
    </div>
  }
}

export default App