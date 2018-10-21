
import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import Reactcal, { DecadeView } from 'react-calendar'
import Redirect from 'react-router-dom/Redirect';
import { Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date()
    }
    this.onClickDay = this.onClickDay.bind(this)
  }

  onClickDay(date) {
    this.setState({ date })
  }



  render() {
    let today = this.state.date

    const onSelectAppt = e => {
      e.preventDefault()
      let time = e.currentTarget.textContent
      let apptDate = today
      let apptTime = timesOfDay
      this.props.updateApptDate(apptDate, apptTime)

      
      
    }
    
    let calendar = <Reactcal onClickDay={this.onClickDay} value={this.state.date} />
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day = daysOfWeek[today.getDay()]
    //const timesOfDay = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM']

    if (today.getDay() === 1 || today.getDay() === 3) {
      return (<div className='row'>
        <div className='col-8 main'>
          <h1> Calendar Page </h1>
          {calendar}
          <h1>{day}, {today.getDate()}/{today.getMonth()}/{today.getFullYear()}</h1>
          <ul>

            <form onSubmit={onSelectAppt}>
            <li>{day}: 9AM Appointment 1 <button type="submit">Select</button></li>


            <li>{day}: 9AM, Appointment 2 <button type="submit">Select</button></li>
            <li>{day}: Appointment 3 <button type="submit">Select</button></li>
            <li>{day}: Appointment 4 <button type="submit">Select</button></li>
            </form>

          </ul>
          <Button as={Link} to='/bookingQuestionnaire'>Questionnaire</Button>
        </div>
      </div>)

    } else if (today.getDay() === 2 || today.getDay() === 5) {
      return (<div className='row'>
        <div className='col-8 main'>
          <h1> Calendar Page </h1>
          {calendar}
          <h1>{day}, {today.getDate()}/{today.getMonth()}/{today.getFullYear()}</h1>
          <ul>
            <li>{day}, Appointment 5 <button>Select</button></li>
            <li>{day}, Appointment 6 <button>Select</button></li>
            <li>{day}, Appointment 7 <button>Select</button></li>
            <li>{day}, Appointment 8 <button>Select</button></li>
          </ul>
        </div>
      </div>)

    } else {
      return (<div className='row'>
        <div className='col-8 main'>
          <h1> Calendar Page </h1>
          {calendar}
          <h1>{day}, {today.getDate()}/{today.getMonth()}/{today.getFullYear()}</h1>
          <h3>Sorry, no appointments available today</h3>
        </div>
      </div>)
    }
  }
}



export default Calendar

