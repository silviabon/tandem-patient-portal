import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class Vitals extends Component {


  render() {
    const vitals = this.props.vitals

    return (
      <Container text>
        <Header as='h4'>
          <Header.Content>Vitals</Header.Content>
        </Header>
        <p><span>Blood pressure - systolic: </span> <span>{vitals.bp_s}</span></p>
        <p><span>Blood pressure -  diastolic: </span> <span>{vitals.bp_d}</span></p>
        <p><span>Weight (kg): </span> <span>{vitals.weight_kg}</span></p>
        <p><span>Height (cm): </span> <span>{vitals.height_cm}</span></p>
        <p><span>Temperature (°C): </span> <span>{vitals.temperature_c}</span></p>
        <p><span>Pulse: </span> <span>{vitals.pulse}</span></p>
        <p><span>BMI: </span> <span>{vitals.bmi}</span></p>
        <p><span>Date: </span> <span>{vitals.date}</span></p>
        <Divider section />
      </Container>
    );
  }
}
export default Vitals;
