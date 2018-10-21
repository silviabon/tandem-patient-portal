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
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getProvider(provider) {
    this.fetch(`/api/providers/${provider}`)
      .then(provider => this.setState({ provider: provider}))
  }


  render () {
    const appt = this.props.appointment
    const status = this.props.status
    let {provider} = this.state
    return provider
    ?(
        <Container text textAlign='center'>
      <div>
        <span> <strong>Date: </strong> <span>{appt.date}</span></span>
        <span> <strong>Time: </strong><span>{appt.time}</span> </span>
        <span> <strong>Dr.: </strong> <span>{provider.last_name}</span></span>
        <span> <strong>Concern: </strong> <span>{appt.concern}</span></span>
        {status === "upcoming"
        ? <span>
          <Button>Change date</Button>
          <Button>Cancel</Button> </span>
          : <Button>Details</Button>
        }  
      </div>
    </Container>
    )
    : <Container text>
       <p>Loading...</p>
      </Container>
  }
}

export default Appointment