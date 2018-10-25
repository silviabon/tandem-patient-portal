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
        this.setState({ login_patient: res.data })
        let patient = res.data
        this.props.updatePatientInState(patient)
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
