import React, { Component } from 'react'
import ConditionCal from './ConditionCal'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class Questionnaire extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      symptoms: [],
      date: `${this.props.location.state.date.getFullYear()}/${this.props.location.state.date.getMonth()}/${this.props.location.state.date.getDate()}`,
      time: this.props.location.state.time,
      formattedDate: this.props.formattedDate,
    }
    this.handleChange = this.handleChange.bind(this);
    this.readFile = this.readFile.bind(this)
  }

  handleChange(e) {
    const fieldName = e.target.name
    const value = e.target.value
    this.setState({ [fieldName]: value })
  }

  readFile(e) {
    const fieldName = e.target.name
    const file = document.getElementById('file').files[0]
    this.setState({ [fieldName]: file })
    console.log(file)
  }

  render() {
    const calendar = this.props.location.state
    const questionnaire = this.state
    const patient = this.props.patient

    const onBookingAppt = e => {
      e.preventDefault()
      confirmAlert({
        title: 'Please confirm',
        message: 'Are you sure you book this appointment?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              this.props.newAppointment(calendar, questionnaire)
              console.log(this)
              this.context.router.history.push(`/home`)
            }
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      })

    };

    //const date = calendar.date

    // const onSubmitQuestionnaire = e => {
    //   e.preventDefault()
    //   let questionnaire = this.state
    //   this.props.updateQuestionnaire(questionnaire)
    // }

    const handleSymptoms = e => {
      const symptoms = this.state.symptoms;
      symptoms.push(e.target.name)
      this.setState({ symptoms })
      //console.log(this.state.symptoms)
    }

    let conditionItems = this.props.conditions.map(condition => (
      <ConditionCal condition={condition} key={condition.id} />
    ));

    // const { concern } = this.state
    // const isEnabled = concern != undefined && concern.trim() != ""

    return (

      <div className='row'>
        <div className='col-8 main'>
          <form className='form-group' onSubmit={onBookingAppt}>

            <h1>Appointment Questionnaire</h1>

            <h3>Let's prepare for your appointment for {calendar.formattedDate} at {calendar.time}</h3>
            <hr />

            <h3>Appointment Details</h3>
            <div className='row'>
              <div className='col-md-6'>
                <select name='apptType' onChange={this.handleChange} className="form-control textarea"  >
                  <option selected value="" disabled >Select Appointment Type</option>
                  <option value="New Concern">New Concern</option>
                  <option value="Follow-up">Follow-up</option>
                </select> </div>
              <div className='col-md-6'>
                <p><select name='conditionType' onChange={this.handleChange} className='form-control textarea '><option selected value="" disabled>Following up? Which Condition?</option>{conditionItems}</select> </p>
              </div>
            </div>
            <p><input placeholder="What is your main concern?" required="true" name="concern" onChange={this.handleChange} className='form-control textarea' ></input></p>
            <p><textarea placeholder="Please describe your main concern. How did it start?" className='form-control textarea' name="concernDescription" onChange={this.handleChange}></textarea></p>

            <hr />
            <div className='row'>

              <div className='col-12'>
                <h3>Symptoms</h3>
                Please indicate which symptoms you are displaying</div>
              <div className='col-md-3'>
                <p><input type="checkbox" name="cough" onChange={handleSymptoms} /> Cough  </p>
                <p><input type="checkbox" name="fever" onChange={handleSymptoms} /> Fever </p>
                <p><input type="checkbox" name="pain" onChange={handleSymptoms} /> Pain </p>
              </div>
              <div className='col-md-3'>
                <p><input type="checkbox" name="nausea" onChange={handleSymptoms} /> Nausea </p>
                <p><input type="checkbox" name="fatique" onChange={handleSymptoms} /> Fatigue </p>
                <p><input type="checkbox" name="swelling" onChange={handleSymptoms} /> Swelling </p>
              </div>
              <div className='col-md-3'>
                <p><input type="checkbox" name="diarrhea" onChange={handleSymptoms} /> Diarrhea </p>
                <p><input type="checkbox" name="vomiting" onChange={handleSymptoms} /> Vomiting </p>
                <p><input type="checkbox" name="shortness of breath" onChange={handleSymptoms} /> Shortness of Breath </p>
              </div>
              <div className='col-md-3'>
                <p><input type="checkbox" name="headache" onChange={handleSymptoms} /> Headache </p>
                <p><input type="checkbox" name="rash" onChange={handleSymptoms} /> Rash </p>
                <p>Other (Please Specify):<input name="otherSymptoms" onChange={this.handleChange} className='textarea form-control' /></p>
              </div>

            </div>

            <div className="vq">
              <hr />
              <div className='row'>
                <div className='col-md-6'>
                  <h3>Vital Measurements</h3>
                  <p>Please enter any vitals you have measured:</p>
                  <p><input placeholder='Temperature (&#176;C)' name='temperature' onChange={this.handleChange} className='textarea form-control' /></p>
                  <p><input placeholder='Heart Rate (BPM)' name='heartrate' onChange={this.handleChange} className='textarea form-control' /></p>
                  <p><input placeholder='Blood Pressure (Systolic)' name='bp_s' onChange={this.handleChange} className='textarea form-control' /> </p>
                  <p><input placeholder='Blood Pressure (Diastolic)' name='bp_d' onChange={this.handleChange} className='textarea form-control' /></p>
                </div>

                <div className='col-md-6'>
                  <h3>Questions for the doctor:</h3>
                  <p>What do you need answered?</p>
                  <p> <input placeholder='First Questions' name='question1' className='textarea form-control' onChange={this.handleChange} />  </p>
                  <p><input placeholder='Second Question' name='question2' className='textarea form-control' onChange={this.handleChange} /></p>


                  <label for="exampleFormControlFile1">Please upload your file</label>
                  <input type="file" className="form-control-file" id="file" name="file" onChange={this.readFile}></input>
                  <Link to={{ pathname: '/home', state: this.state }}><button className='aptbtn-details btn right' >Cancel</button></Link>
                  <button type="submit" value="submit" className='btn login right' >Submit your health Questionnaire</button>
                </div>
              </div>
            </div>


          </form>
        </div>
      </div>)
  }


}

export default Questionnaire