import React, { Component } from 'react'
import { Container, Button, Input, Form, Label, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.getPatients()
  }

  getPatients() {
    axios.get(`http://localhost:3001/api/patients/`)
      .then(res => {
        let patients = res.data
        if (patients.length) {
          this.props.updatePatientsInState(patients)
        }
      })
  }

  render() {
    return (
      <Container fluid>
        <br />
        <Header as='h3' block>Please login</Header>
        <Form>
          <Form.Field>
            <Label color='olive' pointing='below'>Please enter your email</Label>
            <Input focus autoFocus placeholder='example@example.com' type='email' name='email' defaultValue='drmcintosh@gmail.com' />
          </Form.Field>
          <Form.Field>
            <Label color='olive' pointing='below'>Type your password</Label>
            <Input focus placeholder='Type your password' type="password" name="password" defaultValue="123345353453453" />
          </Form.Field>
          <br />
          <Link to={{ pathname: '/home' }} ><Button color='olive'>Login</Button></Link>
        </Form>
      </Container>
    )
  }
}

export default Login
