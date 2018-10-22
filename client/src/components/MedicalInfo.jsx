import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Conditions from './Conditions.jsx';
import Allergies from './Allergies.jsx';
import Prescriptions from './Prescriptions.jsx';
import Immunizations from './Immunizations.jsx';

class MedicalInfo extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    this.getVitalsInfo()
    this.getMedicalInfo('conditions')
    this.getMedicalInfo('allergies')
    this.getMedicalInfo('prescriptions')
    this.getMedicalInfo('immunizations')
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }


  getVitalsInfo() {
    this.fetch(`/api/patients/${this.props.patient}/vitals`)
      .then(vitals => {
        if (vitals.length) {
          const lastVital = vitals[vitals.length - 1]
          console.log("the last vital: ", lastVital)
          this.setState({ vitals: lastVital })
          console.log("state:", this.state)
        }else{
          this.setState({ vitals: [] })
        }
      })
  }

  getMedicalInfo(info) {
    this.fetch(`/api/patients/${this.props.patient}/${info}`)
      .then(infor => {
        if (infor.length) {
          this.setState({[info]: infor })
        }else{
          this.setState({[info]: [] })
        }
        }
      )
  }
  render() {
    let {vitals, conditions, allergies, prescriptions, immunizations} = this.state

    return <Container>
      <Header as='h3'>
        <Header.Content>
          Medical Information
          </Header.Content>
      </Header>
      {vitals
        ? <Container text>
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
          <p><span>Date taken: </span> <span>{vitals.date}</span></p>
          <Divider section />
        </Container>
        : <Container text> loading... </Container>
      }
      {conditions
        ? <Container text>
        <Conditions conditions={this.state.conditions}/>
        </Container>
        : <Container text> loading... </Container>
      }
      {allergies
        ? <Container text>
        <Allergies allergies={this.state.allergies}/>
        </Container>
        : <Container text> loading... </Container>
      }
      {prescriptions
        ? <Container text>
        <Prescriptions prescriptions={this.state.prescriptions}/>
        </Container>
        : <Container text> loading... </Container>
      }
      {immunizations
        ? <Container text>
        <Immunizations immunizations={this.state.immunizations}/>
        </Container>
        : <Container text> loading... </Container>
      }
    </Container>
    
  }
}

export default MedicalInfo

