import {
  SET_LOADING,
  LOAD_COUPLES_JOURNEY
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case LOAD_COUPLES_JOURNEY:
      return {
        ...state,
        couplesJourney: {
          loading: false,
          data: action.payload,
          filteredData: []
        }
      };
    case SET_LOADING:
      return {
        ...state
      }
  }
};