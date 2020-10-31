import React from "react"
import VpdState from "./couplesJourney/context/VpdState";
import CouplesJourney from "./couplesJourney/components/CouplesJourney";

const App = ({data}) => {
  return (
    <VpdState>
          <CouplesJourney vendorId={data.vendorId} />  
    </VpdState>
  );
};

export default App;