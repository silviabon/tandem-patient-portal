import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navbar extends Component {

  render() {
    const patient = this.props.patient
    return (
      <nav className="navbar navbar-light bg-light">
        <Link to={{ pathname: '/home' }} ><Button color='olive'>EMR Portal</Button></Link>
        {patient
          ? (<span>Hello, {patient.first_name} &nbsp;&nbsp;<Button color='red'><a href='/'>Logout</a></Button></span>)
          : <Container>Welcome to EMR Portal</Container>}
      </nav>)
  }
}

export default Navbar
