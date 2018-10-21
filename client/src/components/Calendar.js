




import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import Reactcal, { DecadeView } from 'react-calendar'

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

    componentDidMount() {
    }
    
  render () {
    let calendar = <Reactcal onClickDay={this.onClickDay} value={this.state.date} />
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

      return (<div className='row'>
      <div className='col-8 main'>
      <h1> Calendar Page </h1>
      {calendar}
      <h1>{this.state.date.getDate()}/{this.state.date.getMonth()}/{this.state.date.getFullYear()}</h1>
      </div>
  </div>
      )
      
    }
  }

  
  
  export default Calendar
  
