import React, { useReducer } from "react";
import VpdContext from "./vpdContext";
import VpdReducer from "./vpdReducer";
import VpdApiClient from "./VpdApiClient";
import * as Constants from './Constants'
import {
  SET_LOADING,
  LOAD_COUPLES_JOURNEY,
  LOAD_FILTERS,
  LOAD_SELECTED_FILTERS 
} from "./types";

const VpdState = props => {
  const initialState = {
    couplesJourney: {
      loading: false,
      data: {entries:[]},
      filteredData: {entries:[]},
    },
    filters: {},
    selectedFilters: []
  };

  const [state, dispatch] = useReducer(VpdReducer, initialState);

  const apiClient = new VpdApiClient("");

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


  const _loadFilters = (couplesJourney) => {
    const filters = {
      groups: {},
      singles: []
    }
    const allActionsFilter = _buildFilter(Constants.ALL_ACTIONS_FILTER_TYPE, couplesJourney.totalActionCount)

    filters.singles = [
      allActionsFilter,
      _buildFilter(Constants.BOOKINGS_FILTER_TYPE, couplesJourney.bookingsTotal, couplesJourney.checkmarkAssetUrl)
    ]

    const filtersToBeGrouped = [];
    couplesJourney.actionCounts.forEach((actionCount) => {
      const filter = _buildFilter(actionCount.actionType, actionCount.total)
      if (filter) {
        filter.group ? filtersToBeGrouped.push(filter) : filters.singles.push(filter)
      }
    })

    couplesJourney.entryCounts.forEach((entryCount) => {
      const filter = _buildFilter(entryCount.weddingYear, entryCount.total)
      if (filter) {
        filter.group ? filtersToBeGrouped.push(filter) : filters.singles.push(filter)
      }
    })

    filters.singles.sort((a, b) => a.order > b.order ? 1 : -1)
    //Need to order them before we group them so that the groups are in order
    filtersToBeGrouped.sort((a, b) => a.order > b.order ? 1 : -1)
    filtersToBeGrouped.forEach(filter => {
      if (filters.groups[filter.group]) {
        filters.groups[filter.group].push(filter)
      } else {
        filters.groups[filter.group] = [filter]
      }
    })

    dispatch({
      type: LOAD_FILTERS,
      payload: filters
    });
  }

  const _buildFilter = (filterType, actionCount, iconUrl) => {
    let filter = null
    const label = Constants.FILTER_LABELS.get(filterType)
    if (label) {
      filter = {
        label: label,
        type: filterType,
        count: actionCount,
        order: Constants.FILTERS_ORDER.get(filterType),
        group: _getFilterGroupByActionType(filterType),
        isAllActionsFilter: filterType === Constants.ALL_ACTIONS_FILTER_TYPE
      }
      if (iconUrl) {
        filter.iconUrl = iconUrl
      }
    }
    return filter
  }

  const _getFilterGroupByActionType = (actionType) => {
    let filterGroup = null
    Constants.FILTER_GROUPS.forEach((value, key) => {
      if (value.includes(actionType)) {
        filterGroup = key
      }
    })
    return filterGroup
  }

  //Set loading
  const setLoading = (statePropertyName) => {dispatch({ type: SET_LOADING, payload: statePropertyName})};
  
  const isFilterSelected = filter => { 
    return state.selectedFilters.includes(filter)
  }

  const isFilterGroupSelected = groupKey => {
    return state.selectedFilters.some(filter => filter.group === groupKey)
  }

  const toggleFilter = filter => {
    let selectedFilters = [...state.selectedFilters] 
    if(filter.type === Constants.ALL_ACTIONS_FILTER_TYPE && selectedFilters.length > 0) {
      selectedFilters = []
    } else if(selectedFilters.includes(filter)){
      selectedFilters.splice(selectedFilters.indexOf(filter), 1)
    } else {
      selectedFilters.push(filter)
    }
    _loadSelectedFilters(selectedFilters)
  }

  const _loadSelectedFilters = (filters) => {
    dispatch({
      type: LOAD_SELECTED_FILTERS,
      payload: filters
    });
  }

  return (
    <VpdContext.Provider
      value={{
        //make available to all applications
        couplesJourney: state.couplesJourney,
        filters: state.filters,
        selectedFilters: state.selectedFilters,
        loadCouplesJourney,
        toggleFilter,
        isFilterGroupSelected,
        isFilterSelected
      }}
    >
      {props.children}
    </VpdContext.Provider>
  )
}

export default VpdState;