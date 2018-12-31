import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

import { connect } from 'react-redux';
import { login } from '../../../redux/ducks/reducer'

class Login extends Component {
  constructor () {
    super();
    this.state = {
      userInput: '',
      passInput: '',
      errorMessage: ''
    }
  }

  componentWillMount() {
    axios.get('/user/data')
      .then(response => {
        if (response.data.user) {
          this.props.login(response.data.user);
        }
      })
      .catch()

    if (this.props.user!=null) { // Checking for admin in session
      if(this.props.user.username!=null){

      this.props.history.push('/admin');
      }
    }
  }

  login = () => { // Login as admin
    const username = this.state.userInput
    const password = this.state.passInput
    axios.post('/login', {
      username,
      password
    }).then(response => {
      this.props.login(response.data.username)
      this.props.history.push('/admin');
    }).catch(error => {
      alert("Wrong email or password");
    })
  }


  render() {
    return (
      <div className="login-main">
          <div className="login-input-div">
             <div className="input-data"> {/* check this class */}
              <input className="input-data-field" placeholder="username" ref="username" onChange={ (e) => this.setState({ userInput: e.target.value }) } />
            </div>

            <div className="input-data">{/* check this class */}
              <input className="input-data-field"  placeholder="password" type="password" ref="password" onChange={ (e) => this.setState({ passInput: e.target.value }) } />
            </div>

            <button className="submit-btn" onClick={ this.login }>sign in</button>
            <div className="login-info-container">{this.state.errorMessage}</div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  login: login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);