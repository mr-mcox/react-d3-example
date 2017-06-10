import React, { Component } from 'react'
import { csv } from 'd3-request'
import { timeParse } from 'd3-time-format'

class H1BGraph extends Component {
  constructor() {
    super()

    this.state = {
      rawData: []
    }
  }

  componentWillMount() {
    this.loadRawData()
  }
  
  cleanJobs(title) {
    title = title.replace(/[^a-z ]/gi, '');

    if (title.match(/consultant|specialist|expert|prof|advis|consult/)) {
        title = "consultant";
    }else if (title.match(/analyst|strateg|scien/)) {
        title = "analyst";
    }else if (title.match(/manager|associate|train|manag|direct|supervis|mgr|chief/)) {
        title = "manager";
    }else if (title.match(/architect/)) {
        title = "architect";
    }else if (title.match(/lead|coord/)) {
        title = "lead";
    }else if (title.match(/eng|enig|ening|eign/)) {
        title = "engineer";
    }else if (title.match(/program/)) {
        title = "programmer";
    }else if (title.match(/design/)) {
        title = "designer";
    }else if (title.match(/develop|dvelop|develp|devlp|devel|deelop|devlop|devleo|deveo/)) {
        title = "developer";
    }else if (title.match(/tester|qa|quality|assurance|test/)) {
        title = "tester";
    }else if (title.match(/admin|support|packag|integrat/)) {
        title = "administrator";
    }else{
        title = "other";
    }

    return title;
  }

  loadRawData() {
    let parseDate = timeParse("%m/%d/%Y")
    csv(this.props.url)
      .row((d) => {
        if (!d['base salary']) {
          return null
        }
        return { employer: d.employer,
                submit_date: parseDate(d['submit date']),
                start_date: parseDate(d['start date']),
                case_status: d['case status'],
                job_title: d['job title'],
                clean_job_title: this.cleanJobs(d['job title']),
                base_salary: Number(d['base salary']),
                salary_to: d['salary to'] ? Number(d['salary to']) : null,
                city: d.city,
                state: d.state}
      })
      .get((error, rows) => {
        if (error) {
          console.error(error)
          console.error(error.stack)
        }else{
          this.setState({rawData: rows})
        }
      })
  }

  render() {
    if (!this.state.rawData.length) {
      return (
        <h2> Loading data about lots and lots of H1B visas</h2>
      )
    }
    return (
      <div>
        <svg>
        </svg>
      </div>
    );
  }
}

export default H1BGraph
