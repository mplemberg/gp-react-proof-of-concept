import React, { useEffect, useContext } from "react"
import VpdContext from "../context/vpdContext"
import CouplesJourneyRow from "./CouplesJourneyRow"
import FilterPanel from "./FilterPanel"

const CouplesJourney = ({ vendorId }) => {
  const vpdContext = useContext(VpdContext)

  const {
    loadCouplesJourney,
    couplesJourney,
    selectedFilters,
    filters
  } = vpdContext;

  useEffect(() => {
    if (vendorId) {
      loadCouplesJourney(vendorId)
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="pure-g couplesJourney widget bg-white">
      <div className="pure-u-1">
        <div className="pure-g">
          <div className="pure-u-1">
            <div className="title"> Couples Journey Log </div>
          </div>
        </div>
        <div className="pure-g pt10">
          <div className="pure-u-1">
            <div className="pure-g">
              <div className="pure-u-1">
                <div className="toggle--label">
                  Filter By
                </div> 
              </div>  
            </div>
            <div className="pure-g filtersToolbar">
              <div className="pure-u-1"> 
                <FilterPanel filters={filters}/>
              </div>
            </div>
          </div>
        </div>
        {
          couplesJourney.loading ? <div className="loading" title="...Loading"></div> :
          <div className="pure-g log ">
            <div className="pure-u-1">
              <div className="pure-g log-header">
                <div className="pure-u-3-12"> Visitor Name </div>
                <div className="pure-u-5-12"> Action </div>
                <div className="pure-u-2-12"> Date </div>
                <div className="pure-u-2-12"> Attribution </div>
              </div>
              {
                couplesJourney.entries && couplesJourney.entries.map((entry, index) => {
                    return (
                      <CouplesJourneyRow
                        entry={entry}
                        isStriped={(index % 2) == 1}
                        checkmarkAssetUrl={couplesJourney.data.checkmarkAssetUrl}
                        heartAssetUrl={couplesJourney.data.heartAssetUrl}
                      />
                    );
                })
              }
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default CouplesJourney;