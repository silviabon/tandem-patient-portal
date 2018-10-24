import React, { Component } from 'react'
import Immunization from './Immunization.jsx';


class Immunizations extends Component {


  render() {
    const immunizationsItems = this.props.immunizations.map(immunization => (
      <Immunization immunization={immunization} key={immunization.id} />
    ));

    return (
      <div className='container'>
        <h3>Immunizations</h3>
        {immunizationsItems}
        <br />
      </div>
    )

  }
}

export default Immunizations


