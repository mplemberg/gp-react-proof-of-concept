import React, {useContext} from "react"
import CouplesJourneyContext from "../context/CouplesJourneyContext"

const FilterCheckbox = ({ index, filter }) => {
  const couplesJourneyContext = useContext(CouplesJourneyContext)
  const {
    isFilterSelected,
    toggleFilter
  } = couplesJourneyContext;

  const elementId = `${filter.group}-${index}`
  const isChecked = isFilterSelected(filter)
  const handleClick = () => {
    toggleFilter(filter)
  }
  
  return (
    <label htmlFor={elementId} className="checkbox-container">
      {filter.label} ({filter.count}) 
      <input 
        type="checkbox" 
        id={elementId}
        data-event-type={filter.type}
        data-event-category="Couples Journey Filter"
        onChange={handleClick}
        checked={isChecked}
      />
      <span className="checkbox"></span>
    </label>
  )
}

export default FilterCheckbox;