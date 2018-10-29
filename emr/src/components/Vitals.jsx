import React, { Component } from 'react'
import { Container, Header, Segment, Grid, Label } from 'semantic-ui-react'

class Vitals extends Component {

  render() {
    const vitals = this.props.vitals

    return (<Container>
      <Segment>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column computer={10} mobile={16}>
                <p>&nbsp;&nbsp;  <Label horizontal>Blood pressure - systolic:</Label> {vitals.bp_s}</p>
                <p>&nbsp;&nbsp;  <Label horizontal>Blood pressure - diastolic:</Label> {vitals.bp_d}</p>
                <p>&nbsp;&nbsp;  <Label horizontal>Weight (kg):</Label> {vitals.weight_kg}</p>
                <p>&nbsp;&nbsp;  <Label horizontal>Height (cm):</Label> {vitals.height_cm}</p>
              </Grid.Column>
              <Grid.Column computer={6} mobile={16}>
                <p><Label horizontal>Temperature (°C):</Label> {vitals.temperature_c}</p>
                <p><Label horizontal>Pulse:</Label> {vitals.pulse}</p>
                <p><Label horizontal>BMI:</Label> {vitals.bmi}</p>
                <p><Label horizontal>Date:</Label> {vitals.date}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Segment>
      </Container>
    );
  }
}

export default Vitals;
