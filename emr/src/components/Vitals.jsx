import React, { Component } from 'react'
import { Container, Header, Segment, Grid } from 'semantic-ui-react'

class Vitals extends Component {

  render() {
    const vitals = this.props.vitals

    return (
      <Container fluid>
      <br />
      <Header as='h3' block>Patient Vitals</Header>
      <Segment>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column computer={10} mobile={16}>
                <p>
                  <span>Blood pressure - systolic: </span> <span>{vitals.bp_s}</span><br/>
                  <span>Blood pressure - diastolic: </span> <span>{vitals.bp_d}</span><br />
                  <span>Weight (kg): </span> <span>{vitals.weight_kg}</span><br />
                  <span>Height (cm): </span> <span>{vitals.height_cm}</span><br />
                </p>
              </Grid.Column>
              <Grid.Column computer={6} mobile={16}>
                <p>        
                  <span>Temperature (°C): </span> <span>{vitals.temperature_c}</span><br />
                  <span>Pulse: </span> <span>{vitals.pulse}</span><br />
                  <span>BMI: </span> <span>{vitals.bmi}</span><br />
                  <span>Date: </span> <span>{vitals.date}</span>
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default Vitals;
