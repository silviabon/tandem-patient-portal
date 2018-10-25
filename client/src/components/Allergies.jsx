import React, { Component } from 'react'
import Allergy from './Allergy.jsx';


class Allergies extends Component {

  render() {
    const allergiesItems = this.props.allergies.map(allergy => (
      <Allergy allergy={allergy} key={allergy.id} />
    ));

    return (
      <div className='container'>
        <h3>Allergies</h3>
        {allergiesItems}
        <br/>
      </div>
    )
  }
}

export default Allergies
