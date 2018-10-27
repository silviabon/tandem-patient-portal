import React, { Component } from 'react'


class Vitals extends Component {


  render() {
    const vitals = this.props.vitals

    return (
      <div>
        <h3 className='card-header'>Patient Vitals</h3>
        <div className='card-body med-info'>
        <p><span>Blood pressure - systolic: </span> <span>{vitals.bp_s}</span><br/>
        <span>Blood pressure -  diastolic: </span> <span>{vitals.bp_d}</span><br />
        <span>Weight (kg): </span> <span>{vitals.weight_kg}</span><br />
        <span>Height (cm): </span> <span>{vitals.height_cm}</span><br />
        <span>Temperature (°C): </span> <span>{vitals.temperature_c}</span><br />
        <span>Pulse: </span> <span>{vitals.pulse}</span><br />
        <span>BMI: </span> <span>{vitals.bmi}</span><br />
        <span>Date: </span> <span>{vitals.date}</span></p>
        </div>
      </div>
    );
  }
}
export default Vitals;
