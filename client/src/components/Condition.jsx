import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Condition extends Component {

  render() {
    const condition = this.props.condition

    return (
      <p> <span>{condition.name}</span></p>
    );
  }
}
export default Condition;
