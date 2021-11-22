import React, {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {BrowserRouter as Route} from 'react-router-dom';

class Login extends Component {
  constructor () {
    super();
    this.state = {
      user: {
        userName: '',
        password: ''
      },
      redirect: false
    }
  }
  handleChange = (e) => {
    const updatedUser = {...this.state.user}
    const inputField = e.target.name
    const inputValue = e.target.value
    updatedUser[inputField] = inputValue
    this.setState({user: updatedUser})
  }
  
  handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    this.props.mockLogIn(this.state.user)
    this.setState({redirect: true})
  }
  
  render () {
    if (this.state.redirect) {
      return (<Redirect to="/userProfile"/>)
    }
    return (
      <div>
      <Link to="/userProfile">User Profile  </Link>
      <Link to="/">Return to Home  </Link>
      <Link to="/Debits">Debits  </Link>
      <Link to="/Credits">Credits  </Link>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="userName">User Naaame</label>
            <input type="text" name="userName" onChange={this.handleChange} value={this.state.user.userName}/>
          </div>
          <div>
            <label htmlFor="password">Paaassword</label>
            <input type="password" name="password"/>
          </div>
          <button>Log In!!</button>
        </form>
      </div>
    );
  }
}
export default Login;