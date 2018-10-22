import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Conditions from './Conditions.jsx';
import Allergies from './Allergies.jsx';
import Prescriptions from './Prescriptions.jsx';
import Immunizations from './Immunizations.jsx';
import Vitals from './Vitals.jsx';

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
          this.setState({ vitals: lastVital })
        } else {
          this.setState({ vitals: [] })
        }
      })
  }

  getMedicalInfo(info) {
    this.fetch(`/api/patients/${this.props.patient}/${info}`)
      .then(infor => {
        if (infor.length) {
          this.setState({ [info]: infor })
        } else {
          this.setState({ [info]: [] })
        }
      }
      )
  }
  render() {
    let { vitals, conditions, allergies, prescriptions, immunizations } = this.state

    return <Container>
      <Header as='h3'>
        <Header.Content>
          Medical Information
          </Header.Content>
      </Header>
      {vitals
        ? <Vitals vitals={this.state.vitals} />
        : <Container text> loading... </Container>
      }
      {conditions
        ? <Conditions conditions={this.state.conditions} />
        : <Container text> loading... </Container>
      }
      {allergies
        ? <Allergies allergies={this.state.allergies} />
        : <Container text> loading... </Container>
      }
      {prescriptions
        ? <Prescriptions prescriptions={this.state.prescriptions} />
        : <Container text> loading... </Container>
      }
      {immunizations
        ? <Immunizations immunizations={this.state.immunizations} />
        : <Container text> loading... </Container>
      }
    </Container>

  }
}

export default MedicalInfo

