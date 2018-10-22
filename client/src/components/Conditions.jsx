import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Condition from './Condition.jsx';


class Conditions extends Component {


  render() {
    const conditionsItems = this.props.conditions.map(condition => (
      <Condition condition={condition} key = {condition.id} />
    ));
    
    return (
      <div>
        <Header as='h4'>
          <Header.Content>Conditions</Header.Content>
        </Header>
        {conditionsItems}
        <Divider section />
      </div>
    )
    
  }
}

export default Conditions


