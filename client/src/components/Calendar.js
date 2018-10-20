import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Calendar extends Component {
  render () {
    return <Container text textAlign='center'>
      <h1>Calendar Page</h1>
      <Button as={Link} to='/'>Back to home</Button>
    </Container>
  }
}

export default Calendar