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
  }

  render() {
    let appointments = this.props.appointments
     return <Container text>
       <Divider hidden section />
       {appointments && appointments.length
         ? <div>
           {appointments.map((appointment) => {
             return <Appointment appointment={appointment} key={appointment.id} status={this.props.status}/>
           })}

         </div>
         : <Container textAlign='center'>Loading...</Container>
       }
       <Divider section />
       </Container>
    }
  }


export default AppointmentList