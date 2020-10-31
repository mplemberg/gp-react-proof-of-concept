import React, {useContext} from "react"
import VpdContext from "../context/vpdContext"
import FilterCheckbox from "./FilterCheckbox"


const FilterMenu = ({ group, title, filters}) => {
  const vpdContext = useContext(VpdContext)
  const {
    isFilterGroupSelected
  } = vpdContext;

  const isSelected = isFilterGroupSelected(group)
  return (
    <div className={`pure-menu pure-menu-horizontal filter-menu-pill`}>
      <ul className='pure-menu-list'>
        <li className='pure-menu-item pure-menu-has-children pure-menu-allow-hover filter-li pl5'>
          <div className={`pure-menu-link link-off pure-button filter filter-pill filter-menu-link ${isSelected ? 'filter-pill--selected' : ''}`} aria-haspopup='true'>
            {title} 
            <span className='filter-menu-pill-total'></span>
          </div>
          <ul className='pure-menu-children menu-filter'>
            {
              filters.map((filter, index) => {
                return <li className ='item-filter'>
                  <FilterCheckbox index={index} filter={filter} />
                </li>
              })
            }
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default FilterMenu;