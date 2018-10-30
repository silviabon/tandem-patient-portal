import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class AppointmentPage extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    this.getSummary(this.props.location.state.appointment.appt.id, this.props.location.state.patient.patient)
    this.getProvider(this.props.location.state.appointment.appt.provider_id)
    this.getCondition(this.props.location.state.patient.patient, this.props.location.state.appointment.appt.condition_id)
    this.setState({ appointment: this.props.location.state.appointment.appt })
  }


  getProvider(provider) {
    this.fetch(`/api/providers/${provider}`)
      .then(provider2 => {
        this.setState({ provider: provider2 })
      })
  }

  getCondition(patientId, conditionId) {
    axios.get(`/api/patients/${patientId}/conditions/${conditionId}`)
    .then(res => {
      let condition = res.data;
      console.log("api call ", condition.name )
      this.setState ({ condition : condition.name })
    })
  }

  getSummary(appointmentId, patientId) {
    // this.fetch(`/api/patients/${patientId}/appointments/${appointmentId}/soaps`)
    axios.get(`/api/patients/${patientId}/appointments/${appointmentId}/soaps`)
      .then(res => {
        console.log("axios comming in....")
        let summary = res.data
        if (summary.length) {
          let lSum = "";
          summary.forEach(soap => {
            console.log("soap", soap)
            if (soap.appointment_id == appointmentId) {
              console.log("found it")
              lSum = soap;
            } else {
              console.log("We are in else")
            }
          })
          console.log("lSum", lSum)
          this.setState({ summary: lSum.doctor_summary, doctorfile: lSum.doctorfile.url})
        } else {
          this.setState({ summary: "Empty" })
        }
      })
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  render() {
    let { provider, summary, doctorfile, appointment, condition } = this.state
    return <div className='row'>
      <div className='col-8 main'>
        <div className='row'>
          {
            provider && appointment
              ? <div className='col-xs-12 card apptDetails'>
                <h2>Appointment details</h2>
                <hr />
                <p>Your appointment is on {appointment.date} at {appointment.time} with Dr.{provider.last_name} </p>
                <h3>Your Appointment Summary</h3>
                <p><b>Type:</b> {appointment.app_type}</p>
                <p><b>Condition:</b> {condition
                  ? <span>{condition}</span>
                  : <span></span>
                      }
                </p>
                <p><b>Concern:</b> {appointment.concern}</p>
                <p><b>Description:</b> {appointment.concern_desc}</p>
                <p><b>Symptoms:</b> {appointment.symptoms} {appointment.other_symptoms}</p>
                <hr />
                <h3>Vitals</h3>
                <p><b>Temperature:</b> {appointment.temp}</p>
                <p><b>Heart rate:</b> {appointment.heart_rate}</p>
                <p><b>Blood Pressure:</b> {appointment.bp}</p>
                <p><b>Question 1:</b> {appointment.q1}</p>
                <p><b>Question 2:</b> {appointment.q2}</p>
                {appointment.file.url
                  ? <div><p><b>Document Upload</b></p>
                    <p><a href={'http://localhost:3001/' + appointment.file.url} target='_blank'><img src='https://png.icons8.com/ios/2x/document.png' /></a></p></div>
                  : <div></div>
                }
                {appointment.status === 'completed' &&
                  <div>
                    <hr />
                    {summary
                    ? <div>
                      <h3>Your Doctor's Summary and Instructions</h3>{summary}
                      {doctorfile
                        ? <div>Attachment: <p><a href={'http://localhost:3001/' + doctorfile} target='_blank'><img src='https://png.icons8.com/ios/2x/document.png' /></a></p></div>
                        : <div></div>
                      }
                      </div>
                    : <div></div>
                    }
                  </div>}
              </div>
              : <div className='col-md-12'><p>Loading...</p></div>
          }
          <Link to={{ pathname: '/', state: { appointment: ''} }}><button className='btn aptbtn-more'>Back Home</button></Link>
          {/* <Link to={{ pathname: '/' }}><button className='btn aptbtn-more'>Back Home</button></Link> */}
        </div>
      </div>
    </div>
  }
}

export default AppointmentPage
