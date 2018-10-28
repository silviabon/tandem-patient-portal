import React, { Component } from 'react'
import ProviderAppointment from './ProviderAppointment.jsx'
import { Container, Button, Input, Form, Label, Header, Segment, Grid, List } from 'semantic-ui-react'

class ProviderAppointmentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let appointments = this.props.appointments
    return (
    <Container>
      {appointments && appointments.length
        ? <div>
          {appointments.map((appointment) => {
            let patientName = this.props.patients[appointment.patient_id-1].first_name + ' ' + this.props.patients[appointment.patient_id-1].last_name
            return <ProviderAppointment patientName={patientName} patients={this.props.patients} appointment={appointment} key={appointment.id} status={this.props.status} />
          })}
        </div>
        : <Container>Loading...</Container>
      }
    </Container>
    )
  }
}

export default ProviderAppointmentList
