import React, { Component } from 'react'
import { Container, Button, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ConditionCal from './ConditionCal'

class Questionnaire extends Component {
  constructor(props) {
    super(props)
    
    this.state = {

    }
  }
  

  render () {
   const apptType = [
      { key: 1, text: 'New Concern', value: 'New Concern'},
      { key: 2, text: 'Follow-up', value: 'Follow-up'}
    ]
    //const conditions = this.props.conditions

    let conditionItems = this.props.conditions.map(condition => (
      <ConditionCal condition={condition} key={condition.id} />
    ));
  
    return <Container text textAlign='center'>
      
      {/* <h1>Appointment Date: {this.props.apptDate.toString()}</h1>
      <h1>Appointment Time: {this.props.apptTime}</h1> */}

      <h1>Appointment Date: date</h1>
      <h1>Appointment Time: time</h1>

        <Dropdown placeholder='Select appointment type' fluid selection options={apptType} />
        <ul>{conditionItems}</ul>

      <Button as={Link} to='/bookingConfirmation'>Next</Button>
    </Container>
  }

  
}

export default Questionnaire