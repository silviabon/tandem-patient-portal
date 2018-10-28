import React, { Component } from 'react'
import { Container, Button, Input, Form, Label, Header, Segment, Grid, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navbar extends Component {

  render () {
    const patient = this.props.patient
    return(
    <nav className="navbar navbar-light bg-light">
      <Link to={{ pathname: '/home' }} ><Button color='teal'>EMR Portal</Button></Link>
      {patient
            ? (<span>Hello, {patient.first_name} &nbsp;&nbsp;<button className="btn btn-danger navbar-btn"><a href='/'>Logout</a></button></span>)
            : <Container>Welcome to EMR Portal</Container>}
    </nav>)
  }
}

export default Navbar
