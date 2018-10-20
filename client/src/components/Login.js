import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Login extends Component {
  render () {
    return <Container text textAlign='center'>
      <h1>Login Page</h1>
      <Button as={Link} to='/'>Back to home</Button>
    </Container>
  }
}

export default Login