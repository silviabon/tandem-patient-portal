import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Prescription from './Prescription.jsx';


class Prescriptions extends Component {


  render() {
    const prescriptionsItems = this.props.prescriptions.map(prescription => (
      <Prescription prescription={prescription} key={prescription.id} />
    ));

    return (
      <div className='container'>
        <h4>Prescriptions</h4>
        {prescriptionsItems}
        <br />
      </div>
    )

  }
}

export default Prescriptions


