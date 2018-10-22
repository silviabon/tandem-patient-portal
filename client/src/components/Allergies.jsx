import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Allergy from './Allergy.jsx';


class Allergies extends Component {

  render() {
    const allergiesItems = this.props.allergies.map(allergy => (
      <Allergy allergy={allergy} key={allergy.id} />
    ));

    return (
      <Container text>
        <Header as='h4'>
          <Header.Content>Allergies</Header.Content>
        </Header>
        {allergiesItems}
        <Divider section />
      </Container>
    )
  }
}

export default Allergies


