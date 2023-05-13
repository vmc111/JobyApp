import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const apiStrings = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

export default class JobCard extends Component {
  state = {apiStatus: apiStrings.initial, jobDetailsArray: []}

  componentDidMount() {
    this.callJobsApi()
  }

  onSuccessApi = data => {
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
      apiStatus: apiStrings.success,
      jobDetailsArray: formattedData,
    })
  }

  renderJob = () => {
    const {apiStatus, jobDetailsArray} = this.state

    if (apiStatus === apiStrings.success) {
      return jobDetailsArray.map(job => (
        <div key={job.id} className="jobs-bg">
          <div className="logo-title">
            <img src={job.companyLogoUrl} alt={job.id} className="logo" />
            <div className="title-rating">
              <p className="title">{job.title}</p>
              <div className="rating-div">
                <AiFillStar size="30" color="#fbbf24" />
                <p className="rating">{job.rating}</p>
              </div>
            </div>
          </div>
          <div className="details">
            <div className="location-type-div">
              <div className="location-div">
                <MdLocationOn size="30" color="#ffffff" />
                <p className="location">{job.location}</p>
              </div>
              <div className="type-div">
                <BsBriefcaseFill size="30" color="#ffffff" />
                <p className="type">{job.employmentType}</p>
              </div>
            </div>
            <p className="package">{job.packagePerAnnum}</p>
          </div>
          <div className="description-div">
            <p className="description-title">Description</p>
            <p className="text">{job.jobDescription}</p>
          </div>
        </div>
      ))
    }

    if (apiStatus === apiStrings.failure) {
      return (
        <div className="failure-view">
          <img
            className="img"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
            alt="failure view"
          />
          <h1 className="failure-heading">Oops! Something Went Wrong</h1>
          <p className="failure-text">
            We cannot seem to find the page you are looking for.
          </p>
          <button
            onClick={this.callJobsApi}
            type="button"
            className="retry-btn-2"
          >
            Retry
          </button>
        </div>
      )
    }

    if (apiStatus === apiStrings.inProgress) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }

    return (
      <div className="failure-view">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-text">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  callJobsApi = async () => {
    this.setState({apiStatus: apiStrings.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {jobUrl} = this.props
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessApi(data)
    } else {
      this.setState({apiStatus: apiStrings.failure})
    }
  }

  render() {
    return <div className="main-bg">{this.renderJob()}</div>
  }
}
