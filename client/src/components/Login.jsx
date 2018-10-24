import React, { Component } from 'react'
import { Container, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class Login extends Component {
  constructor() {
    super()
    this.state = {
      patient: 5
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
    alert('An form was submitted: ' + event.target.email.value + ' ' + event.target.password.value)
    let body = JSON.stringify({email: event.target.email.value, password: event.target.password.value })
    let o = fetch('http://localhost:3001/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body,
      }).then((response) => {return response.json()}).
      then(console.log("back", o))
  }

  render () {
    return <Container text textAlign='center'>
      <h1>Login Page</h1>
      <Header as='h4'>
        <Header.Content>Patient login</Header.Content>
      </Header>
      <form onSubmit={this.handleSubmit}>
      <input type="text" name="email" placeholder="Type your email"></input>
      <input type="password" name="password" placeholder="Type your password"></input>
      <input type="submit" value="Submit" />
      </form>
      <Button as={Link} to='/'>Back to home</Button>
    </Container>
  }
}

export default Login
