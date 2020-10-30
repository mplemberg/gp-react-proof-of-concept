
import {
  SET_LOADING,
  LOAD_COUPLES_JOURNEY,
  LOAD_FILTERS,
  LOAD_SELECTED_FILTERS
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case LOAD_COUPLES_JOURNEY:
      return {
        ...state,
        couplesJourney: {
          ...state.couplesJourney,
          loading: false,
          data: action.payload,
        }
      }
    case LOAD_FILTERS:
      return {
        ...state,
        filters: action.payload
      }
    case LOAD_SELECTED_FILTERS:
      return {
        ...state,
        selectedFilters: action.payload
      }
    case SET_LOADING:
      return {
        ...state,
        couplesJourney: {
          ...state.couplesJourney,
          loading:true
        }
      }
  }
};