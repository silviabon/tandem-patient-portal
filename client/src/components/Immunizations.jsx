import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Immunization from './Immunization.jsx';


class Immunizations extends Component {


  render() {
    const immunizationsItems = this.props.immunizations.map(immunization => (
      <Immunization immunization={immunization} key={immunization.id} />
    ));

    return (
      <Container text>
        <Header as='h4'>
          <Header.Content>Immunizations</Header.Content>
        </Header>
        {immunizationsItems}
        <Divider section />
      </Container>
    )

  }
}

export default Immunizations


