import React from 'react'
import PropTypes from 'prop-types'

import './functionsPanelSection.scss'

const FunctionsPanelSection = ({ children, title, className }) => {
  return (
    <div className={`panel-section functions-panel__section ${className}`}>
      <div className="panel-section__title">
        <h5>{title}</h5>
      </div>
      {children && <div className="panel-section__body">{children}</div>}
    </div>
  )
}

FunctionsPanelSection.defaultProps = {
  className: ''
}

FunctionsPanelSection.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired
}

export default FunctionsPanelSection
