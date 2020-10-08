import React, { useReducer } from "react";
import VpdContext from "./vpdContext";
import VpdReducer from "./vpdReducer";
import VpdApiClient from "./VpdApiClient";
import {
  SET_LOADING,
  LOAD_COUPLES_JOURNEY
} from "./types";

const VpdState = props => {
  const initialState = {
    couplesJourney: {
      loading: false,
      data: {entries:[]},
      filteredData: {entries:[]}
    },
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
    } catch (error) {
      console.error(error);
    }
  };

  //Set loading
  const setLoading = (statePropertyName) => dispatch({ type: SET_LOADING, payload: statePropertyName});
  
  return (
    <VpdContext.Provider
      value={{
        //make available to all applications
        couplesJourney: state.couplesJourney,
        loadCouplesJourney
      }}
    >
      {props.children}
    </VpdContext.Provider>
  );
};

export default VpdState;