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

    return <Container text textAlign='center'>


      <form>
      <h1>Appointment Date: {calendar.formattedDate}</h1>
      <h1>Appointment Time: {calendar.time}</h1>
        {/* <h1>Appointment Date: date</h1>
        <h1>Appointment Time: time</h1> */}
        Please select the type of appointment:
        <select name='apptType' onChange={this.handleChange}>
          <option value="New Concern">New Concern</option>
          <option value="Follow-up">Follow-up</option>
        </select>

        Please select which condition you want to follow-up: <select name='conditionType' onChange={this.handleChange}><option></option>{conditionItems}</select> <br />

        <span>What is your main concern: <input placeholder="Please Specify" name="concern" onChange={this.handleChange}></input></span><br />
        <span>Please describe your concern:<textarea placeholder="Describe more..." name="concernDescription" onChange={this.handleChange}></textarea></span><br />
        Which of the following conditions are you displaying?

        <input type="checkbox" name="cough" onChange={handleSymptoms} /> Cough
        <input type="checkbox" name="fever" onChange={handleSymptoms} /> Fever
        <input type="checkbox" name="pain" onChange={handleSymptoms} /> Pain
        <input type="checkbox" name="nausea" onChange={handleSymptoms} /> Nausea
        <input type="checkbox" name="fatique" onChange={handleSymptoms} /> Fatigue
        <input type="checkbox" name="swelling" onChange={handleSymptoms} /> Swelling
        <input type="checkbox" name="diarrhea" onChange={handleSymptoms} /> Diarrhea
        <input type="checkbox" name="vomiting" onChange={handleSymptoms} /> Vomiting
        <input type="checkbox" name="shortness of breath" onChange={handleSymptoms} /> Shortness of Breath
        <input type="checkbox" name="headache" onChange={handleSymptoms} /> Headache
        <input type="checkbox" name="rash" onChange={handleSymptoms} /> Rash
        Other (Please Specify):<input name="otherSymptoms" onChange={this.handleChange}/>

        Please enter any vitals you have measured:
        <span>Temperature: <input name='temperature' onChange={this.handleChange} />  Heart Rate: <input name='heartrate' onChange={this.handleChange} /></span>
        <span>Blood Pressure (Systolic): <input name='bp_s' onChange={this.handleChange} />  Blood Pressure (Diastolic): <input name='bp_d' onChange={this.handleChange} /></span>
        Questions for the doctor:
        <span>Question 1: <input name='question1' onChange={this.handleChange} />  Question 2: <input name='question2' onChange={this.handleChange} /></span>

        <Link to={{ pathname: '/bookingConfirmation', state: this.state }} >
        <input type="submit" value="submit"/> 
        </Link>
      </form>
      <br />
    </Container>
  }


}

export default Questionnaire