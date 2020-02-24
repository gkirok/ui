import React from 'react'
import PropTypes from 'prop-types'

import bestIterationIcon from '../../images/best-iteration-icon.png'
import { resultsTable } from '../../utils/resultsTable'

const DetailsResults = ({ job }) => {
  const result = resultsTable(job)
  return (
    <div className="table__item_results">
      {job.iterationStats && (
        <table className="table__item_results__table">
          <thead>
            <tr>
              {result.headers.map((item, i) => (
                <th key={i}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.items.map((item, i) => (
              <tr key={i}>
                {item.map((value, i) => {
                  if (value.length > 3) {
                    return (
                      <td key={`${value}${i}`}>
                        <i
                          className={value}
                          title={`${value[0].toUpperCase()}${value.slice(1)}`}
                        />
                      </td>
                    )
                  } else if (
                    job.results &&
                    value === job.results.best_iteration &&
                    i === 0
                  ) {
                    return (
                      <td
                        key={`${value}${i}`}
                        className="table__item_results__table_medal"
                      >
                        {value}
                        <img
                          src={bestIterationIcon}
                          alt="Best iteration"
                          title="Best iteration"
                        />
                      </td>
                    )
                  } else {
                    return <td key={`${value}${i}`}>{+value}</td>
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

DetailsResults.propTypes = {
  job: PropTypes.shape({}).isRequired
}

export default DetailsResults
