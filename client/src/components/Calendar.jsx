
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
      date: new Date(),
      daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      appConfig: {
        title: 'Calendar Page',
        listItems: ['9am', '10am', '1pm', '2pm'],
      }
    }
    this.onClickDay = this.onClickDay.bind(this)
    this.renderFormattedDateLabel = this.renderFormattedDateLabel.bind(this)
    this.createCalendarAppointnments = this.createCalendarAppointnments.bind(this)
    this.onTimeClick = this.onTimeClick.bind(this)
  }

  renderFormattedDateLabel(date) {
    this.setState({ formattedDate: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`})
    console.log('formattedStringFunction:', this.state)
  }
  onClickDay(date) {
    this.setState({ date })
    let today = this.state.date
    console.log("this is the new date", date)
    this.renderFormattedDateLabel(today)
  }

  createCalendarAppointnments = () => {
    let calendarAppts = []
    this.state.appConfig.listItems.map((item, index) => {
      const day = this.state.daysOfWeek[this.state.date.getDay()]
      calendarAppts.push(<li key={index}>{day}: {item} Appointment {index + 1} <button onClick={this.onTimeClick} value={item}>Select</button></li>)
    })
    return calendarAppts;
  }

  onTimeClick = e => {
    e.preventDefault()
    let aptTime = e.target.value
    this.setState( { time: aptTime })
    console.log(this.state.time)
  }

  render() {
    let today = this.state.date
    const onSelectAppt = e => {
      e.preventDefault()
      let apptDate = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`
      let apptTime = this.state.time
      this.props.updateApptDate(apptDate, apptTime)
    }

    let calendar = <Reactcal onClickDay={this.onClickDay} value={this.state.date} />
    const day = this.state.daysOfWeek[today.getDay()]

      return (<div className='row'>
        <div className='col-8 main'>
          <h1> Calendar Page </h1>
          {calendar}
          <h1>{day}, {this.props.formattedDate}</h1>
          <form onSubmit={onSelectAppt}>
          <ul>
          {this.createCalendarAppointnments()}
          </ul>
          <Link to={{ pathname: '/bookingQuestionnaire', state: this.state }} ><button type="submit">Continue</button></Link>
          </form>
        </div>
      </div>
      )
  }
}

export default Calendar