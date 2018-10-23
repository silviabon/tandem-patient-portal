import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class Allergy extends Component {


  render() {
    const allergy = this.props.allergy

    return (
      <p> <span>{allergy.name}</span></p>
    );
  }
}
export default Allergy;
