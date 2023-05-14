import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
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

const JobCard = props => {
  const {jobDetailsArray, apiStatus, apiFunc} = props
  console.log(jobDetailsArray.length)

  const retryFunc = () => {
    apiFunc()
  }

  if (apiStatus === apiStrings.success && jobDetailsArray.length === 0) {
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

  if (apiStatus === apiStrings.success) {
    return jobDetailsArray.map(job => (
      <Link to={`/jobs/${job.id}`} className="td">
        <li key={job.id} className="jobs-bg">
          <div className="logo-title">
            <img src={job.companyLogoUrl} alt="company logo" className="logo" />
            <div className="title-rating">
              <h6 className="title">{job.title}</h6>
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
            <h6 className="description-title">Description</h6>
            <p className="text">{job.jobDescription}</p>
          </div>
        </li>
      </Link>
    ))
  }

  if (apiStatus === apiStrings.inProgress) {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
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
        <button onClick={retryFunc} type="button" className="retry-btn-2">
          Retry
        </button>
      </div>
    )
  }

  return null
}
export default JobCard
