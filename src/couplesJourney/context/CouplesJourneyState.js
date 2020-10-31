import React, { useReducer } from "react";
import CouplesJourneyContext from "./CouplesJourneyContext";
import Reducer from "./Reducer";
import ApiClient from "./ApiClient";
import * as Constants from './Constants'
import {
  SET_LOADING,
  LOAD_COUPLES_JOURNEY,
  LOAD_FILTERS,
  LOAD_SELECTED_FILTERS,
  FILTER_COUPLES_JOURNEY,
  LOAD_DESCRIPTION
} from "./Types";

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

  const [state, dispatch] = useReducer(Reducer, initialState);

  const apiClient = new ApiClient("");

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
    if(filter.type === Constants.ALL_ACTIONS_FILTER_TYPE) {
      selectedFilters = []
    } else if(selectedFilters.includes(filter)){
      selectedFilters.splice(selectedFilters.indexOf(filter), 1)
    } else {
      selectedFilters.push(filter)
    }
    _loadSelectedFilters(selectedFilters)
    _filterCouplesJourney(selectedFilters)
    _loadFilterDescription(selectedFilters)
  }

  const _loadSelectedFilters = (filters) => {
    dispatch({
      type: LOAD_SELECTED_FILTERS,
      payload: filters
    });
  }

  const _filterCouplesJourney = (selectedFilters) => {
    const filteredEntries = selectedFilters.length > 0 ? state.couplesJourney.data.entries.filter(entry => _doesSatisfyFilters(selectedFilters, entry)) : state.couplesJourney.data.entries
    dispatch({
      type: FILTER_COUPLES_JOURNEY,
      payload: filteredEntries
    });
  }

  const _doesSatisfyFilters = (selectedFilters, {actionTypes, weddingYear, isBooking}) => {
    const selectedPreFilters = selectedFilters.filter(value => Constants.PRE_ACTION_TYPES.includes(value.type))
    const selectedPostFilters = selectedFilters.filter(value => Constants.POST_ACTION_TYPES.includes(value.type))
    const selectedWeddingYearFilters = selectedFilters.filter(value => Constants.WEDDING_YEAR_TYPES.includes(value.type))
    let numFiltersSatisfied = 0

    let shouldShowPre = false
    let shouldShowPost = false
    let shouldShowWeddingYear = false

    // Should show based on pre filters
    if ((selectedPreFilters.filter(value => actionTypes.includes(value.type))).length > 0) {
      shouldShowPre = true
    }

    // Should show based on post filters
    if ((selectedPostFilters.filter(value => actionTypes.includes(value.type))).length > 0) {
      shouldShowPost = true
    }

    // Should show based on wedding-year filters
    if ((selectedWeddingYearFilters.filter(value => value.type === weddingYear)).length > 0) {
      shouldShowWeddingYear = true
    }

    const remainingFilters = selectedFilters.filter(value => !( (Constants.PRE_ACTION_TYPES.concat(Constants.POST_ACTION_TYPES.concat(Constants.WEDDING_YEAR_TYPES))).includes(value.type)) )

    remainingFilters.forEach(filter => {
      if (
        filter.type === Constants.ALL_ACTIONS_FILTER_TYPE ||
        actionTypes.includes(filter.type) ||
        (filter.type === Constants.BOOKINGS_FILTER_TYPE && isBooking) ||
        (filter.type === Constants.REVIEW_ACTION_TYPE && actionTypes.includes(Constants.EXPLICIT_REVIEW_ACTION_TYPE))
      ) {
        numFiltersSatisfied++
      }
    })

    let shouldShow = false

    if (numFiltersSatisfied === remainingFilters.length) {
      if (selectedPreFilters.length > 0) {
        if (selectedPostFilters.length > 0) {
          shouldShow = shouldShowPre && shouldShowPost
        } else {
          shouldShow = shouldShowPre
        }
      } else if (selectedPostFilters.length > 0) {
        shouldShow = shouldShowPost
      } else {
        shouldShow = true
      }

      if (selectedWeddingYearFilters.length > 0) {
        shouldShow = shouldShow && shouldShowWeddingYear
      }
    }

    return shouldShow
  }

  const _loadFilterDescription = (selectedFilters) => {
    const description = _buildFilterDescription(selectedFilters)
    dispatch({
      type: LOAD_DESCRIPTION,
      payload: description
    });
  }

  const _buildFilterDescription = (selectedFilters) => {
    let phrase= ''
    let punctuation= ''
    let currentFilterGroup  = ''
    let priorFilterGroup = ''
    let sortedFilters = selectedFilters.sort((a, b) => a.order > b.order ? 1 : -1)

    sortedFilters.filter(filter => filter.type !== 'ALL_ACTIONS').forEach(filter => {
      currentFilterGroup = _getFilterGroupByActionType(filter.type)
      if (phrase !== '' && currentFilterGroup && priorFilterGroup === currentFilterGroup) {
        punctuation = ', '
      } else if (phrase !== '') {
        punctuation = "' + '"
      }
      phrase += punctuation + filter.label
      priorFilterGroup = currentFilterGroup
    })

    if (phrase.length > 0) phrase = `'${phrase}'`
    return phrase
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