import React, { useReducer } from "react"
import CouplesJourneyContext from "./CouplesJourneyContext"
import Reducer from "./Reducer";
import ApiClient from "../utils/ApiClient"
import FilterHelper from "../utils/FilterHelper"
import {
  SET_LOADING,
  LOAD_COUPLES_JOURNEY,
  LOAD_FILTERS,
  LOAD_SELECTED_FILTERS,
  FILTER_COUPLES_JOURNEY,
  LOAD_DESCRIPTION
} from "./Test/Types";

const CouplesJourneyState = props => {
  const initialState = {
    couplesJourney: {
      loading: false,
      data: {
        entries:[]
      },
      entries: []
    },
    filters: {},
    selectedFilters: [],
    description: ''
  };
  let test = 'test'

  const [state, dispatch] = useReducer(Reducer, initialState);
  const apiClient = new ApiClient("");

  const _loadFilters = (couplesJourney) => {
    dispatch({
      type: LOAD_FILTERS,
      payload:  FilterHelper.buildFilters(couplesJourney)
    });
  }
  
  const _loadSelectedFilters = (filters) => {
    dispatch({
      type: LOAD_SELECTED_FILTERS,
      payload: filters
    });
  }

  const _filterCouplesJourney = (selectedFilters) => {
    const filteredEntries = selectedFilters.length > 0 ? state.couplesJourney.data.entries.filter(entry => FilterHelper.doesSatisfyFilters(selectedFilters, entry)) : state.couplesJourney.data.entries
    dispatch({
      type: FILTER_COUPLES_JOURNEY,
      payload: filteredEntries
    });
  }

  const _loadFilterDescription = (selectedFilters) => {
    const description = FilterHelper.buildFilterDescription(selectedFilters)
    dispatch({
      type: LOAD_DESCRIPTION,
      payload: description
    });
  }

  const loadCouplesJourney = async (vendorId) => {
    setLoading('couplesJourney');
    try {
      let result = await apiClient.getCouplesJourney(vendorId);
      dispatch({
        type: LOAD_COUPLES_JOURNEY,
        payload: result.data
      });
      _loadFilters(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  //Set loading
  const setLoading = (statePropertyName) => {dispatch({ type: SET_LOADING, payload: statePropertyName})};
  
  const isFilterSelected = filter => { 
    return state.selectedFilters.includes(filter)
  }

  const isFilterGroupSelected = groupKey => {
    return state.selectedFilters.some(filter => filter.group === groupKey)
  }

  const toggleFilter = filter => {
    const selectedFilters = FilterHelper.toggleFilter(filter, [...state.selectedFilters])
    _loadSelectedFilters(selectedFilters)
    _filterCouplesJourney(selectedFilters)
    _loadFilterDescription(selectedFilters)
  }

  return (
    <CouplesJourneyContext.Provider
      value={{
        //expose to all applications
        couplesJourney: state.couplesJourney,
        filters: state.filters,
        selectedFilters: state.selectedFilters,
        description: state.description,
        loadCouplesJourney,
        toggleFilter,
        isFilterGroupSelected,
        isFilterSelected
      }}
    >
      {props.children}
    </CouplesJourneyContext.Provider>
  )
}

export default CouplesJourneyState;