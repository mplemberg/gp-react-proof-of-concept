import React from "react"
import VpdState from "./context/VpdState";
import CouplesJourney from "./components/CouplesJourney";

const App = ({data}) => {
  return (
    <VpdState>
          <CouplesJourney vendorId={data.vendorId} />  
    </VpdState>
  );
};

export default App;