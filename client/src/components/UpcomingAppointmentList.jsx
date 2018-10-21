import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Appointment from './Appointment.jsx';


class UpcomingAppointment extends Component {
  constructor() {
    super()
    this.state = {
    }
  }
  componentDidMount() {
    this.getUpcomingAppointments()
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getUpcomingAppointments() {
    this.fetch('/api/patients/1/appointments/')
      .then(appointments => {
        if (appointments.length) {
          const appts = appointments.filter(app => app.status === 'upcoming')
          this.setState({ appointments: appts })
        } else {
          this.setState({ appointments: [] })
        }
      })
  }

  render() {
    let {appointments} = this.state
    console.log("this is inside render: ", appointments)
     return appointments
     ? <Container text>
       <Divider hidden section />
       {appointments && appointments.length
         ? <div>
           {appointments.map((appointment) => {
             return <Appointment appointment={appointment} key={appointment.id} />
           })}

         </div>
         : <Container textAlign='center'>No appointments found.</Container>
       }
       <Divider section />
       
     </Container>
     : <Container text>
       <Dimmer active inverted>
         <Loader content='Loading' />
       </Dimmer>
     </Container>
    }
  }

export default UpcomingAppointment