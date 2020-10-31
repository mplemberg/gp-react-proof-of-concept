import React, { useEffect, useContext } from "react"
import CouplesJourneyContext from "../context/CouplesJourneyContext"
import Entry from "./Entry"
import FilterPanel from "./FilterPanel"
import Summary from "./Summary"

const CouplesJourney = ({ vendorId }) => {
  const couplesJourneyContext = useContext(CouplesJourneyContext)

  const {
    loadCouplesJourney,
    couplesJourney,
    selectedFilters,
    filters,
    description
  } = couplesJourneyContext;

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
        {
          couplesJourney.loading ? <div className="loading" title="...Loading"></div> :
          <React.Fragment>
            <FilterPanel filters={filters}/>
            <Summary  count={couplesJourney.entries.length} description={description}/>
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
                        <Entry
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
          </React.Fragment>
        }
      </div>
    </div>
  );
};

export default CouplesJourney;