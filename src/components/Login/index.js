import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

export default class Login extends Component {
  state = {userName: '', password: '', errorMsg: ''}

  onChangeUsername = event => this.setState({userName: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onLoginSuccess = data => {
    const {match} = this.props
    const {history} = match
    console.log(data)
    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken)
    history.replace('/')
  }

  SubmitForm = async event => {
    event.preventDefault()
    const {userName, password} = this.state

    const user = {
      userName,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(user),
    }

    const apiUrl = 'https://apis.ccbp.in/login'

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data)
    } else {
      this.setState({errorMsg: response.error_msg})
    }
  }

  renderErrorText = () => {
    const {errorMsg} = this.state
    if (errorMsg === '') {
      return null
    }

    return (
      <>
        <p className="error-text">*{errorMsg}</p>
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="username-input-field"
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {userName} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          placeholder="Username"
          type="text"
          id="username"
          className="username-input-field"
          value={userName}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    return (
      <div className="login-bg">
        <form className="login-form" onSubmit={this.SubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {this.renderErrorText()}
        </form>
      </div>
    )
  }
}
