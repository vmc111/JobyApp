import {Component} from 'react'
import './index.css'

const apiStrings = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
export default class Login extends Component {
  state = {userName: '', password: '', responseStatus: apiStrings.initial}

  onChangeUsername = event => this.setState({userName: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

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
    console.log(data)
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
    const {responseStatus} = this.state

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
        </form>
      </div>
    )
  }
}
