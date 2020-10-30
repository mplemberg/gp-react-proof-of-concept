import React from "react"
import VpdContext from "../context/vpdContext"
import FilterMenu from "./FilterMenu"
import FilterButton from "./FilterButton"

const FilterPanel = ({ filters }) => {
  const FILTER_GROUP_LABELS = new Map([
    ['PRE_ACTION_TYPES', 'Pre-Actions'],
    ['POST_ACTION_TYPES', 'Booking Actions'],
    ['WEDDING_YEAR_TYPES', 'Wedding Date']
  ])

  return (
    <React.Fragment>
      <React.Fragment>
        {filters.groups !== undefined && Object.keys(filters.groups).map((key) => {
          return <FilterMenu title={FILTER_GROUP_LABELS.get(key)} filters={filters.groups[key]}/>
        })}
      </React.Fragment>
      <React.Fragment>
        {filters.singles !== undefined && filters.singles.map((filter, index) => {
          return <FilterButton filter={filter}/>
        })}
      </React.Fragment>
    </React.Fragment>
  )
}

export default FilterPanel;