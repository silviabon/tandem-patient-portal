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
      <form>
      <div className='col-8 main'>

      <h1>Appointment Date: {calendar.formattedDate}</h1>
      <h1>Appointment Time: {calendar.time}</h1>
      
        Please select the type of appointment:
        <select name='apptType' onChange={this.handleChange}>
          <option value="New Concern">New Concern</option>
          <option value="Follow-up">Follow-up</option>
        </select><br />

        Please select which condition you want to follow-up: <select name='conditionType' onChange={this.handleChange}><option></option>{conditionItems}</select> <br />
        <br />
        <div>What is your main concern: <input placeholder="Please Specify" name="concern" onChange={this.handleChange}></input></div><br />
        <div>Please describe your concern:<textarea placeholder="Describe more..." name="concernDescription" onChange={this.handleChange}></textarea></div><br />
        
        <div className='row'>
        <div className='col-12'>Which of the following conditions are you displaying?</div>
        <div className='col-6'>
        
        <input type="checkbox" name="cough" onChange={handleSymptoms} /> Cough <br /> 
        <input type="checkbox" name="fever" onChange={handleSymptoms} /> Fever <br />
        <input type="checkbox" name="pain" onChange={handleSymptoms} /> Pain <br />
        <input type="checkbox" name="nausea" onChange={handleSymptoms} /> Nausea <br />
        <input type="checkbox" name="fatique" onChange={handleSymptoms} /> Fatigue <br />
        <input type="checkbox" name="swelling" onChange={handleSymptoms} /> Swelling <br />

        </div>
        <div className='col-6'>
        <input type="checkbox" name="diarrhea" onChange={handleSymptoms} /> Diarrhea <br />
        
        
        <input type="checkbox" name="vomiting" onChange={handleSymptoms} /> Vomiting <br />
        <input type="checkbox" name="shortness of breath" onChange={handleSymptoms} /> Shortness of Breath <br />
        <input type="checkbox" name="headache" onChange={handleSymptoms} /> Headache <br />
        <input type="checkbox" name="rash" onChange={handleSymptoms}  /> Rash <br />
        Other (Please Specify):<input name="otherSymptoms" onChange={this.handleChange}/> <br />
        </div>
        </div>
        Please enter any vitals you have measured: <br />
        Temperature: <input name='temperature' onChange={this.handleChange} />  
        Heart Rate: <input name='heartrate' onChange={this.handleChange} />
        Blood Pressure (Systolic): <input name='bp_s' onChange={this.handleChange} />  
        Blood Pressure (Diastolic): <input name='bp_d' onChange={this.handleChange} />
        Questions for the doctor:
        Question 1: <input name='question1' onChange={this.handleChange} />  
        Question 2: <input name='question2' onChange={this.handleChange} />

        <Link to={{ pathname: '/bookingConfirmation', state: this.state }} >
        <input type="submit" value="submit"/> 
        </Link>
        </div>
      </form>
      </div>)
  }


}

export default Questionnaire