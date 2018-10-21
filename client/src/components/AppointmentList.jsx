import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Appointment from './Appointment.jsx';

class AppointmentList extends Component {
  constructor() {
    super()
    this.state = {
    }
  }
  componentDidMount() {
   const bla = this.props.appointments
   console.log ("this is bla: ", bla)
  }

  render() {
    let appointments = this.props.appointments
    console.log ("this is the props passed: ", appointments)
     return <Container text>
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
    }
  }


export default AppointmentList