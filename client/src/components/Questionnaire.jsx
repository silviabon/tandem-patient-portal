import React, { Component } from 'react'
import { Container, Button, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ConditionCal from './ConditionCal'

class Questionnaire extends Component {
  constructor(props) {
    super(props)
    this.state = {
      symptoms: [],
      date: `${this.props.location.state.date.getFullYear()}/${this.props.location.state.date.getMonth()}/${this.props.location.state.date.getDate()}`, 
      time: this.props.location.state.time,
      formattedDate: this.props.formattedDate
    }
    this.handleChange = this.handleChange.bind(this);
  }

handleChange(e) {
      const fieldName = e.target.name
      const value = e.target.value
      this.setState({ [fieldName]: value })
 }
  render() {
    console.log(this.props)
    const calendar = this.props.location.state
    const date = calendar.date
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

    return (
      
      <div className='row'>
      <div className='col-8 main'>
      <form className='form-group'>
      
      <h1>Appointment Questionnaire</h1>
      <hr />
      <h3>Appointment Date: {calendar.formattedDate}</h3>
      <h3>Appointment Time: {calendar.time}</h3>
      <hr />
      <h4>Appointment Details</h4>
        Please select the type of appointment:
        <select name='apptType' onChange={this.handleChange}>
        <option selected>Please Choose...</option>
          <option value="New Concern">New Concern</option>
          <option value="Follow-up">Follow-up</option>
        </select> <br />

        <p>If this is a follow-up, please select the condition: <select name='conditionType' onChange={this.handleChange} className='textarea'><option selected>Your Conditions</option>{conditionItems}</select> </p>
        <p>What is your main concern: <input placeholder="Please Specify" name="concern" onChange={this.handleChange} className='textarea'></input></p>
        <p>Please describe your concern:<br /><textarea className='textarea' placeholder="My concern started when..." name="concernDescription" onChange={this.handleChange}></textarea></p>
        <hr />
        <div className='row'>
        
        <div className='col-12'>
        <h4>Symptoms</h4>
        Please indicate which symptoms you are displaying</div>
        <div className='col-6'>
        <p><input type="checkbox" name="cough" onChange={handleSymptoms} /> Cough  </p>
        <p><input type="checkbox" name="fever" onChange={handleSymptoms} /> Fever </p>
        <p><input type="checkbox" name="pain" onChange={handleSymptoms} /> Pain </p>
        <p><input type="checkbox" name="nausea" onChange={handleSymptoms} /> Nausea </p>
        <p><input type="checkbox" name="fatique" onChange={handleSymptoms} /> Fatigue </p>
        <p><input type="checkbox" name="swelling" onChange={handleSymptoms} /> Swelling </p>
        </div>

        <div className='col-6'>
        <p><input type="checkbox" name="diarrhea" onChange={handleSymptoms} /> Diarrhea </p>
        <p><input type="checkbox" name="vomiting" onChange={handleSymptoms} /> Vomiting </p>
        <p><input type="checkbox" name="shortness of breath" onChange={handleSymptoms} /> Shortness of Breath </p>
        <p><input type="checkbox" name="headache" onChange={handleSymptoms} /> Headache </p>
        <p><input type="checkbox" name="rash" onChange={handleSymptoms}  /> Rash </p>
        <p>Other (Please Specify):<input name="otherSymptoms" onChange={this.handleChange}/></p> 
        </div>

        </div>

        <div className="vq">
        <br />
        <br />
        <hr />
        <div className='row'>
        <div className='col-6'>
        <h4>Vital Measurements</h4>
        Please enter any vitals you have measured: <br />
        <p>Temperature: <input name='temperature' onChange={this.handleChange} className='textarea'/></p>  
        <p>Heart Rate: <input name='heartrate' onChange={this.handleChange} className='textarea'/></p>
        <p>Blood Pressure (Systolic): <input name='bp_s' onChange={this.handleChange} className='textarea'/> </p> 
        <p>Blood Pressure (Diastolic): <input name='bp_d' onChange={this.handleChange} className='textarea'/></p>
        </div>
 
        <div className='col-6'>
        <h4>Questions for the doctor:</h4>
        <p>Question 1: <input name='question1' className='textarea' onChange={this.handleChange} />  </p>
        <p>Question 2: <input name='question2' className='textarea' onChange={this.handleChange} /></p>
        </div>
        </div>
        </div>
        <Link to={{ pathname: '/bookingConfirmation', state: this.state }} >
        <input type="submit" value="submit"/> 
        </Link>
        
      </form>
      </div>
      </div>)
  }


}

export default Questionnaire