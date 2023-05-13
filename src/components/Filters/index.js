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
  state = {
    selectedType: '',
    selectedSalary: '',
  }

  employmentType = () => (
    <ul className="list">
      {employmentTypesList.map(item => (
        <li key={item.label} className="list-item">
          <input type="checkbox" className="radio-input" id={item.label} />
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
            name="options"
            type="radio"
            className="radio-input"
            id={item.salaryRangeId}
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
          <p className="title">Type of Employment</p>
          {this.employmentType()}
        </div>
        <div className="list-container">
          <p className="title">Salary Range</p>
          {this.salaryRanges()}
        </div>
      </div>
    )
  }
}
