import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {

  }

  handleSubmit = event => {
    event.preventDefault()

    axios.post(`/api/login/`, { email: event.target.email.value, password: event.target.password.value })
      .then(res => {
        console.log(res)
        console.log(res.data)
        let patient = res.data
        this.props.updatePatientInState(patient)
        axios.get(`/api/patients/${patient.id}/conditions`)
        .then(res2 => {
          let conditions = res2.data
          this.props.updateConditionsInState(conditions)
          })
        axios.get(`/api/patients/${patient.id}/appointments/`)
        .then(res3  => {
          let appointments = res3.data
          if (appointments.length) {
            const appts = appointments.filter(app => app.status === 'completed')
            this.props.updateCompletedAppointmentsInState(appts)
            appts = appointments.filter(app => app.status === 'upcoming')
            this.props.updateUpcomingAppointmentsInState(appts)
          }
        })
        console.log('Now we do the redirect')
        this.context.router.history.push(`/home`)
        // this.redirectToTarget()
      })
}

render () {
  let { patient } = this.state
  return <div  className='container'>
    <h1>Login Page</h1>
    <h2>Patient login</h2>
    <form onSubmit={this.handleSubmit}>
    <input type="text" name="email" placeholder="Type your email"></input>
    <input type="password" name="password" placeholder="Type your password"></input>
    <input type="submit" value="Submit" />
    </form>
  </div>
}
}

export default Login
