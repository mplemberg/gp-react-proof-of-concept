import React from "react"

const FilterButton = ({ filter }) => {
  return (
    <button 
      className={`pure-button filter ${filter.isAllActionsFilter ? 'filter-link' : 'filter-pill'}`}
      data-event-type={filter.type}
      data-event-category="Couples Journey Filter"
    > 
      {filter.iconUrl ? <img className="pr5" src={filter.iconUrl} alt="check"></img> : ''}
      {filter.label}
    </button>
  )
}

export default FilterButton;