import {Component} from 'react'

import './index.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

export default class Filters extends Component {
  changeSalary = event => {
    const {setSalary} = this.props
    setSalary(event.target.value)
  }

  changeType = event => {
    const {setEmployement} = this.props
    setEmployement(event.target.value)
  }

  employmentType = () => (
    <ul className="list">
      {employmentTypesList.map(item => (
        <li key={item.label} className="list-item">
          <input
            type="checkbox"
            className="radio-input"
            onChange={this.changeType}
            value={item.employmentTypeId}
            id={item.label}
          />
          <label className="label" htmlFor={item.label}>
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  )

  salaryRanges = () => (
    <ul className="list">
      {salaryRangesList.map(item => (
        <li className="list-item" key={item.salaryRangeId}>
          <input
            id={item.salaryRangeId}
            onChange={this.changeSalary}
            name="options"
            type="radio"
            className="radio-input"
            value={item.salaryRangeId}
          />
          <label className="label" htmlFor={item.salaryRangeId}>
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  )

  render() {
    return (
      <div className="filters">
        <div className="list-container border-container">
          <h3 className="title">Type of Employment</h3>
          {this.employmentType()}
        </div>
        <div className="list-container">
          <h3 className="title">Salary Range</h3>
          {this.salaryRanges()}
        </div>
      </div>
    )
  }
}
