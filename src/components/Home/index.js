import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="bg-main">
    <Header />
    <div className="home-bg">
      <h1 className="title">Find The Job That Fits Your Life</h1>
      <p className="description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the Des job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
