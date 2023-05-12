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
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
        alt="website logo"
        className="nav-logo"
      />
      <div className="desktop-view">
        <div className="nav-elements">
          <Link to="/" className="link">
            <p className="nav-element">Home</p>
          </Link>
          <Link to="/jobs" className="link">
            <p className="nav-element">Jobs</p>
          </Link>
        </div>
        <div className="btn-container">
          <button type="button" className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="mobile-view">
        <Link to="/" className="m-view-icons">
          <AiFillHome size="30" color="#ffffff" />
        </Link>
        <Link to="/about" className="m-view-icons">
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
