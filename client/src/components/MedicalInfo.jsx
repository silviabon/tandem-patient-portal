import React, { Component } from 'react'
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

    return <div><h3>Medical Information</h3>
    <div className='card'>
      {vitals
        ? <Vitals vitals={this.state.vitals} />
        : <div className='container'> loading... </div>
      }
      {conditions
        ? <Conditions conditions={this.state.conditions} />
        : <div className='container'> loading... </div>
      }
      {allergies
        ? <Allergies allergies={this.state.allergies} />
        : <div className='container'> loading... </div>
      }
      {prescriptions
        ? <Prescriptions prescriptions={this.state.prescriptions} />
        : <div className='container'> loading... </div>
      }
      {immunizations
        ? <Immunizations immunizations={this.state.immunizations} />
        : <div className='container'> loading... </div>
      }
    </div>
    </div>
  }
}

export default MedicalInfo

