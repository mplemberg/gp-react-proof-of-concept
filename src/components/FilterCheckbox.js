import React from "react"

const FilterCheckbox = ({ index, filter }) => {
  const elementId = `app-couples-journey-filter-checkbox-${index}`
  return (
    <label htmlFor={elementId} className="checkbox-container">
      {filter.label} ({filter.count}) 
      <input 
        type="checkbox" 
        id={elementId}
        data-event-type={filter.type}
        data-event-category="Couples Journey Filter"
      />
      <span className="checkbox"></span>
    </label>
  )
}

export default FilterCheckbox;