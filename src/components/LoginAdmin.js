import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../style/Login.css';
import * as FontAwesome from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import store from '../store';
import userAction from '../actions/user-action'
import userListAction from '../actions/user-list-action'

const WrongInput = (props) => {
  if (!props.show) {
    return null
  }
  return (
    <div className="wrongInput">
      Benutzername oder Passwort ist falsch!
    </div>
  )
}

const LoginLink = () => {
  return (
    <div className="loginLink">
      <NavLink to='login' className="navlink" >
        <FontAwesome.FaArrowLeft className="icon" />
      </NavLink>
    </div>
  )
}

class LoginAdmin extends Component {
  constructor (props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isSubmitted: false,
      isWrong: false
    }
  }

  updateUsernameValue (evt) {
    this.setState({
      username: evt.target.value
    })
  }

  updatePasswordValue (evt) {
    this.setState({
      password: evt.target.value
    })
  }

  async componentDidMount() {
    const response = await fetch('/ring/list');
    const list = await response.json();
    store.dispatch(userListAction( 'GET_USER_LIST', {
      'userList': list
    }))
  }

  onFormSubmit = () => {
    fetch('/ai/login', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset-UTF-8"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.value === 'true') {
        store.dispatch(userAction( 'GET_USER', {
          'user': data.user
        }))
        this.setState({
          isSubmitted: true
        })
      } else {
        this.setState({
          isWrong: true,
          admin: '',
          password: ''
        })
      }
    })
  }

  render () {

    if (this.state.isSubmitted) {
      return <Redirect to="/ai" />
    }

    return (
      <div className="background">
        <LoginLink/>
        <div className="center">
          <div className="head">
            Admin Login
          </div>
          <div className="form">
            <WrongInput show={this.state.isWrong} />
            <label>
              Benutzername
              <input type="text" placeholder="Benutzername" value={this.state.username} onChange={(e) => this.updateUsernameValue(e)} />
            </label>
            <label>
              Passwort
              <input type="password" placeholder="Passwort" value={this.state.password} onChange={(e) => this.updatePasswordValue(e)} />
            </label>
            <input type="submit" value="Senden" onClick={this.onFormSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginAdmin;