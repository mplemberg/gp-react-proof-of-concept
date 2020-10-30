import React, {useContext} from "react"
import VpdContext from "../context/vpdContext"

const FilterCheckbox = ({ index, filter }) => {
  const vpdContext = useContext(VpdContext)
  const {
    isFilterSelected,
    toggleFilter
  } = vpdContext;

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