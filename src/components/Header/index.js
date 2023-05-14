import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <ul className="desktop-view">
        <div className="nav-elements">
          <Link to="/" className="link">
            <li className="nav-element">Home</li>
          </Link>
          <Link to="/jobs" className="link">
            <li className="nav-element">Jobs</li>
          </Link>
        </div>
        <li className="btn-container">
          <button type="button" className="logout-btn" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
      <div className="mobile-view">
        <Link to="/" className="m-view-icons">
          <AiFillHome size="30" color="#ffffff" />
        </Link>
        <Link to="/jobs" className="m-view-icons">
          <BsBriefcaseFill size="30" color="#ffffff" />
        </Link>
        <button className="icon-btn" type="button" onClick={logout}>
          <FiLogOut size="30" color="#ffffff" />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
