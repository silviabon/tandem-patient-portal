import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import Reactcal from 'react-calendar'

class Calendar extends Component {
  state = {
    date: new Date()
  }
  
  onChange = date => this.setState({ date })
  
  render () {
    console.log(this.state.date)
    return (<div className="row">
    <div className="main col-8">
      <h1>Calendar Page</h1>
      <Reactcal 
      onChange={this.onChange}
      value={this.state.date}
       />
</div>
</div>
    )
  }
}

export default Calendar
