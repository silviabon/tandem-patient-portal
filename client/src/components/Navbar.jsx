import React, { Component } from 'react'

class Navbar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const patient = this.props.patient
    return(
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="/">Patient Portal</a>
        <ul className="nav justify-content-end">
          <li>Welcome, {patient.first_name}</li>
          <li><button className="btn btn-danger navbar-btn">Login</button></li>
          <li><button className="btn btn-danger navbar-btn">Logout</button></li>
        </ul>
    </nav>)
  }
}

export default Navbar