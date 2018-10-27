import React, { Component } from 'react'

class Navbar extends Component {

  render () {
    const patient = this.props.patient
    return(
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="/">EMR Portal</a>
      {patient
            ? (<span>Hello, {patient.first_name} &nbsp;&nbsp;<button className="btn btn-danger navbar-btn"><a href='/'>Logout</a></button></span>)
            : <div className='container'>Welcome to EMR Portal</div>}
    </nav>)
  }
}

export default Navbar
