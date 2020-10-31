import React from "react"

const Summary = ({ count, description }) => {
  const couplesCount = `${count} Couple${count === 1 ? "" : "s"} ${count === 0 ? "found" : ""}`

  return (
    <div className="pure-g">
      <div className="pure-u-1">
        <div className="journey-summary">
          <span className="journey-summary-count">
            {couplesCount}
          </span>
          <span className="journey-summary-filter">
            {description}
          </span>
        </div>
      </div>
    </div>  
  )
}

export default Summary;