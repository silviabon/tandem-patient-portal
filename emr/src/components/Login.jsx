import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    console.log('emr login component did mount')
    this.getPatients()
  }

  getPatients() {
    axios.get(`/api/patients/`)
          .then(res  => {
            let patients = res.data
            console.log("patients[]", patients)
            if (patients.length) {
              this.props.updatePatientsInState(patients)
            }
          })
  }

  render () {
    return <div><div className='backgroundImgContainer'>
    <div className='row tofront'>
    <div className='opacity col-md-5 main'>
    <br />
      <h2>Please login</h2>
      <form className='form-group opaque'>
      <input className='form-control textarea' type="text" name="email" placeholder="example@example.com" defaultValue="drmcintosh@gmail.com"></input>
      <input className='form-control textarea' type="password" name="password" placeholder="Type your password" defaultValue="123"></input>
      <br />
      <Link to={{ pathname: '/home' }} ><button type="submit" className="btn btn-primary" >Login</button></Link>
      </form>
      </div>
    </div>
    </div>
    </div>
  }
}

export default Login
