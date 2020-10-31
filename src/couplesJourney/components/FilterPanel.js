import React from "react"
import CouplesJourneyContext from "../context/CouplesJourneyContext"
import FilterMenu from "./FilterMenu"
import FilterButton from "./FilterButton"

const FilterPanel = ({ filters }) => {
  const FILTER_GROUP_LABELS = new Map([
    ['PRE_ACTION_TYPES', 'Pre-Actions'],
    ['POST_ACTION_TYPES', 'Booking Actions'],
    ['WEDDING_YEAR_TYPES', 'Wedding Date']
  ])

  return (
    <div className="pure-g pt10">
      <div className="pure-u-1">
        <div className="pure-g">
          <div className="pure-u-1">
            <div className="toggle--label">
              Filter By
            </div> 
          </div>  
        </div>
        <div className="pure-g filtersToolbar">
          <div className="pure-u-1"> 
            <React.Fragment>
              {filters.groups !== undefined && Object.keys(filters.groups).map((key) => {
                return <FilterMenu title={FILTER_GROUP_LABELS.get(key)} filters={filters.groups[key]} group={key}/>
              })}
            </React.Fragment>
            <React.Fragment>
              {filters.singles !== undefined && filters.singles.map((filter, index) => {
                return <FilterButton filter={filter}/>
              })}
            </React.Fragment>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel;