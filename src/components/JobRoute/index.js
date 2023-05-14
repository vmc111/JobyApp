import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'

import Header from '../Header'
import Filters from '../Filters'
import JobCard from '../Job'
import './index.css'

const apiStrings = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

export default class JobRoute extends Component {
  state = {
    jobApiStatus: apiStrings.initial,
    jobDetailsArray: [],
    profileApi: apiStrings.initial,
    profile: [],
    employementType: [],
    salaryRanges: '',
    name: '',
  }

  componentDidMount() {
    this.getProfile()
    this.callJobsApi()
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
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
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
          <button onClick={this.getProfile} type="button" className="retry-btn">
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

  setSalary = salaryId =>
    this.setState({salaryRanges: salaryId}, this.callJobsApi)

  setEmployement = value => {
    const {employementType} = this.state
    if (employementType.includes(value)) {
      console.log(value)
      this.setState(
        {
          employementType: employementType.filter(
            eachValue => eachValue !== value,
          ),
        },
        this.callJobsApi,
      )
    } else {
      this.setState(
        preState => ({
          employementType: [...preState.employementType, value],
        }),
        this.callJobsApi,
      )
    }
  }

  changeName = event =>
    this.setState({name: event.target.value}, this.callJobsApi)

  onSuccessJobApi = data => {
    const formattedData = data.jobs.map(data1 => ({
      companyLogoUrl: data1.company_logo_url,
      employmentType: data1.employment_type,
      id: data1.id,
      jobDescription: data1.job_description,
      location: data1.location,
      packagePerAnnum: data1.package_per_annum,
      rating: data1.rating,
      title: data1.title,
    }))
    console.log(formattedData)
    this.setState({
      jobApiStatus: apiStrings.success,
      jobDetailsArray: formattedData,
    })
  }

  callJobsApi = async () => {
    this.setState({jobApiStatus: apiStrings.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {salaryRanges, employementType, name} = this.state
    const type = employementType.join(',')

    const jobUrl = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${salaryRanges}&search=${name}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessJobApi(data)
    } else {
      this.setState({jobApiStatus: apiStrings.failure})
    }
  }

  render() {
    const {
      employementType,
      salaryRanges,
      jobDetailsArray,
      jobApiStatus,
      name,
    } = this.state

    const searchItem = (
      <div className="search-container">
        <input
          onChange={this.changeName}
          value={name}
          type="search"
          className="search"
          placeholder="Search"
        />
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
            <div className="hide-on-desktop">{searchItem}</div>
            <div className="profile-border">{this.renderProfile()}</div>
            <Filters
              setEmployement={this.setEmployement}
              setSalary={this.setSalary}
            />
          </div>
          <div className="jobs-container">
            <div className="hide-on-mobile">{searchItem}</div>
            <JobCard
              jobDetailsArray={jobDetailsArray}
              apiStatus={jobApiStatus}
              apiFunc={this.callJobsApi}
            />
          </div>
        </div>
      </div>
    )
  }
}
