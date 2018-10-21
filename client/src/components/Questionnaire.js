import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Questionnaire extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    console.log(this.props)
    return <Container text textAlign='center'>
      <h1>Confirmation Page</h1>
      <h1>Appointment Date: {this.props.apptDate.toString()}</h1>
      <h1>Appointment Time: {this.props.apptTime}</h1>
      <Button as={Link} to='/'>Back to home</Button>
    </Container>
  }
}

export default Questionnaire