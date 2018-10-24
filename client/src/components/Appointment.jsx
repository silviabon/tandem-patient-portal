import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Appointment extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    this.getProvider(this.props.appointment.provider_id)
     this.setState({patient: this.props.appointment.patient_id})
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getProvider(provider) {
    this.fetch(`/api/providers/${provider}`)
      .then(provider => this.setState({ provider: provider }))
  }

  render() {
    const appt = this.props.appointment
    const status = this.props.status
    let { provider, patient } = this.state
    let link = `appointment/${this.props.appointment.id}`
    return provider && patient
      ? (
        <div className='container' text textAlign='center'>
            <span> <strong>Date: </strong> <span>{appt.date}</span></span>
            <span> <strong>Time: </strong><span>{appt.time}</span> </span>
            <span> <strong>Dr.: </strong> <span>{provider.last_name}</span></span>
            <span> <strong>Concern: </strong> <span>{appt.concern}</span></span>
            {status === "upcoming"
              ? <span>
                <a className="btn btn-primary" href="/" role="button">Change Date</a>
                <a className="btn btn-primary" href="/" role="button">Delete</a>
                </span>
            : <button className='btn btn-primary'><Link to={{ pathname: link, state: { appointment: { appt }, patient: { patient } } }}>Details</Link></button>
            }
        </div>
      )
      : <div className='container'>
        <p>Loading...</p>
      </div>
  }
}

export default Appointment
