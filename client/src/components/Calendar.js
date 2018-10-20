import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Reactcal from 'react-calendar'

class Calendar extends Component {
  state = {
    date: new Date(),
  }
  
  render () {
    return <div className="row">
    <div className="main col-8">
      <h1>Calendar Page</h1>
</div>
</div>
  }
}

export default Calendar
