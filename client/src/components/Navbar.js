import React, { Component } from 'react'

class Navbar extends Component {
  render () {
    return(
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="btn btn-danger navbar-btn"> Logout </button>
    </nav>)
  }
}

export default Navbar