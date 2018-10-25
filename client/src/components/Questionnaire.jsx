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
      
      <h3>Let's prepare for your appointment for {calendar.formattedDate} at {calendar.time}</h3>
      <hr />
      <h3>Appointment Details</h3>
        <select name='apptType' onChange={this.handleChange} className="form-control">
        <option selected>Select Appointment Type</option>
          <option value="New Concern">New Concern</option>
          <option value="Follow-up">Follow-up</option>
        </select> <br />

        <p><select name='conditionType' onChange={this.handleChange} className='form-control textarea'><option selected>Following up? Which Condition?</option>{conditionItems}</select> </p>
        <p><input placeholder="What is your main concern?" name="concern" onChange={this.handleChange} className='form-control textarea'></input></p>
        <p><textarea placeholder="Please describe your main concern. How did it start?" className='form-control textarea' name="concernDescription" onChange={this.handleChange}></textarea></p>
        <hr />
        <div className='row'>
        
        <div className='col-12'>
        <h3>Symptoms</h3>
        Please indicate which symptoms you are displaying</div>
        <div className='col-md-6'>
        <p><input type="checkbox" name="cough" onChange={handleSymptoms} /> Cough  </p>
        <p><input type="checkbox" name="fever" onChange={handleSymptoms} /> Fever </p>
        <p><input type="checkbox" name="pain" onChange={handleSymptoms} /> Pain </p>
        <p><input type="checkbox" name="nausea" onChange={handleSymptoms}  /> Nausea </p>
        <p><input type="checkbox" name="fatique" onChange={handleSymptoms}   /> Fatigue </p>
        <p><input type="checkbox" name="swelling" onChange={handleSymptoms}   /> Swelling </p>
        </div>

        <div className='col-md-6'>
        <p><input type="checkbox" name="diarrhea" onChange={handleSymptoms} /> Diarrhea </p>
        <p><input type="checkbox" name="vomiting" onChange={handleSymptoms} /> Vomiting </p>
        <p><input type="checkbox" name="shortness of breath" onChange={handleSymptoms} /> Shortness of Breath </p>
        <p><input type="checkbox" name="headache" onChange={handleSymptoms} /> Headache </p>
        <p><input type="checkbox" name="rash" onChange={handleSymptoms}  /> Rash </p>
        <p>Other (Please Specify):<input name="otherSymptoms" onChange={this.handleChange} className='textarea form-control'/></p> 
        </div>

        </div>

        <div className="vq">
        <br />
        <br />
        <hr />
        <div className='row'>
        <div className='col-md-6'>
        <h3>Vital Measurements</h3>
        <p>Please enter any vitals you have measured:</p>
        <p><input placeholder='Temperature (&#176;C)' name='temperature' onChange={this.handleChange} className='textarea form-control'/></p>  
        <p><input placeholder='Heart Rate (BPM)' name='heartrate' onChange={this.handleChange} className='textarea form-control'/></p>
        <p><input placeholder='Blood Pressure (Systolic)' name='bp_s' onChange={this.handleChange} className='textarea form-control'/> </p> 
        <p><input placeholder='Blood Pressure (Diastolic)' name='bp_d' onChange={this.handleChange} className='textarea form-control'/></p>
        </div>
 
        <div className='col-md-6'>
        <h3>Questions for the doctor:</h3>
        <p>What do you need answered?</p>
        <p> <input placeholder='First Questions' name='question1' className='textarea form-control' onChange={this.handleChange} />  </p>
        <p><input placeholder='Second Question' name='question2' className='textarea form-control' onChange={this.handleChange} /></p>
        <Link to={{ pathname: '/bookingConfirmation', state: this.state }} >
        <button type="submit" value="submit" className='btn btn-primary right'>Submit your health Questionnaire</button>
        </Link>
        </div>
        </div>
        </div>
        
        
      </form>
      </div>
      </div>)
  }


}

export default Questionnaire