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

  handleSubmit = event => {
    event.preventDefault()

    axios.post(`/api/login/`, { email: event.target.email.value, password: event.target.password.value })
      .then(res => {
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
        this.context.router.history.push(`/home`)
        // this.redirectToTarget()
      })
}

  render () {
    let { patient } = this.state
    
    return <div><div  className='backgroundImgContainer'>
    <img src='https://images.pexels.com/photos/905874/pexels-photo-905874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />
    <div className='row tofront'>
    <div className='opacity col-md-5 main'>
    <br />
      <h2>Please login</h2>
      
      <form onSubmit={this.handleSubmit} className='form-group opaque'>
      <input className='form-control textarea' type="text" name="email" placeholder="example@example.com"></input>
      <input className='form-control textarea' type="password" name="password" placeholder="Type your password"></input>
      <br />
      <p>Are you a new user? <a href='#'>Learn more</a> about our registration process.</p>
      
      <input className='btn btn-primary' type="submit" value="Login" />
      </form>
      </div>
    </div>
    </div>
    </div>
  }
}
export default Login
