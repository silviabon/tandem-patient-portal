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
      {patient
            ? (<span>Hello, {patient.first_name} &nbsp;&nbsp;<button className="btn btn-danger navbar-btn"> Logout </button></span>)
            : <div className='container'>Welcome to Patient Portal</div>}
    </nav>)
  }
}

export default Navbar