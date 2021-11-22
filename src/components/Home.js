import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import pic from './IMAG1977.jpg';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Bank of React!</h1>
        <Link to="/userProfile">User Profile  </Link>
        <Link to="/Login">Log In  </Link>
        <Link to="/Debits">Debits  </Link>
        <Link to="/Credits">Credits  </Link>
      </div>
    );
  }
}

export default Home;