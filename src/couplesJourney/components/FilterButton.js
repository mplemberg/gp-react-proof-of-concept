import React, {useContext} from "react"
import CouplesJourneyContext from "../context/CouplesJourneyContext"

const FilterButton = ({ filter }) => {
  const couplesJourneyContext = useContext(CouplesJourneyContext)
  const {
    isFilterSelected,
    toggleFilter
  } = couplesJourneyContext;

  const isSelected = isFilterSelected(filter)
  const handleClick = () => {
    toggleFilter(filter)
  }

  return (
    <button 
      className={`pure-button filter ${filter.isAllActionsFilter ? 'filter-link' : 'filter-pill'} ${ isSelected ? 'filter-pill--selected' : ''}`}
      data-event-type={filter.type}
      data-event-category="Couples Journey Filter"
      onClick={handleClick}
    > 
      {filter.iconUrl ? <img className="pr5" src={filter.iconUrl} alt="check"></img> : ''}
      {filter.label}
    </button>
  )
}

export default FilterButton;