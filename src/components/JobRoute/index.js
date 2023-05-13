import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'

import Header from '../Header'
import Filters from '../Filters'
import './index.css'

const apiStrings = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

export default class JobRoute extends Component {
  state = {profileApi: apiStrings.initial, profile: []}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileApi: apiStrings.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      console.log(formattedData)

      this.setState({profile: formattedData, profileApi: apiStrings.success})
    } else {
      this.setState({profileApi: apiStrings.failure})
    }
  }

  renderProfile = () => {
    const {profile, profileApi} = this.state
    if (profileApi === apiStrings.success) {
      return (
        <div className="profile">
          <img
            src={profile.profileImageUrl}
            alt="avatar"
            className="profile-avatar"
          />
          <p className="profile-name">{profile.name}</p>
          <p className="profile-bio">{profile.shortBio}</p>
        </div>
      )
    }
    if (profileApi === apiStrings.failure) {
      return (
        <div className="retry-btn-container">
          <button type="button" className="retry-btn">
            Retry
          </button>
        </div>
      )
    }
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  render() {
    const searchItem = (
      <div className="search-container">
        <input type="search" className="search" placeholder="Search" />
        <div className="icon">
          <FaSearch size="20" color="#ffffff" />
        </div>
      </div>
    )
    return (
      <div className="bg-main">
        <Header />
        <div className="jobs-route-bg">
          <div className="profile-filters">
            <div className="desktop-view">{searchItem}</div>
            <div className="profile-border">{this.renderProfile()}</div>
            <Filters />
          </div>
        </div>
      </div>
    )
  }
}
