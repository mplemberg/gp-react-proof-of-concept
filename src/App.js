import React from "react"
import CouplesJourneyState from "./couplesJourney/context/CouplesJourneyState";
import CouplesJourney from "./couplesJourney/components/CouplesJourney";

const App = ({data}) => {
  return (
    <CouplesJourneyState>
          <CouplesJourney vendorId={data.vendorId} />  
    </CouplesJourneyState>
  );
};

export default App;