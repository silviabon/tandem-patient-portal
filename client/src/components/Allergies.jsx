import React, { Component } from 'react'
import Allergy from './Allergy.jsx';


class Allergies extends Component {

  render() {
    const allergiesItems = this.props.allergies.map(allergy => (
      <Allergy allergy={allergy} key={allergy.id} />
    ));

    return (
      <div>
        <h3 className='card-header'>Allergies</h3>
        {allergiesItems}
      </div>
    )
  }
}

export default Allergies
