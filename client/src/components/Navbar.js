import React, { Component } from 'react'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      patient: ''
    }
    this.getPatients = this.getPatients.bind(this)
    this.getPatient = this.getPatient.bind(this)
  }

  componentDidMount() {
    this.getPatients()
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getPatients() {
    this.fetch('/api/patients')
      .then(patients => {
        this.getPatient(patients[0].id)
      })
  }

    getPatient(id) {
      this.fetch(`/api/patients/${id}`)
      .then(patient => this.setState({patient: patient.first_name}))
    }

  render () {

    return(
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">Navbar</a>
      <h1>Hello, {this.state.patient}</h1>
      <button className="btn btn-danger navbar-btn"> Logout </button>
    </nav>)
  }
}

export default Navbar