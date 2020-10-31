import React from "react";

const Entry = ({entry, isStriped, checkmarkAssetUrl, heartAssetUrl}) => {
  const entryclasses = isStriped ? 'log-entry--striped' : ''

  const buildSubRow = (value) => {
    return <div className="pure-g sub-entry">
      <div className="pure-u-1">
        {value}
      </div>
    </div>
  }

  const subRowsLabels = entry.actions.map(item => {
    const valueName = item.actionLabel
    const valueCount = item.actionCount > 1 ? ' (' + item.actionCount + ')' : ''
    return buildSubRow(valueName + valueCount)
  });

  const subRowsDates = entry.actions.map(item => {
    return buildSubRow(item.dateDisplay)
  });


  const weddingDate = entry.weddingDate ? 
  <div className="wedding-date-entry">
    <img className="pl5" src={heartAssetUrl} alt="Heart"></img>
    <div className="wedding-date-text">{entry.weddingDate}</div>
  </div> : '' ;

  const booking = <span><img className="pr5" src={checkmarkAssetUrl} alt="check"></img> Booking </span>;

  return (
    <div className={`pure-g log-entry ${entryclasses}`}>
      <div className="pure-u-3-12">
          <div className="strong">{entry.visitorName}</div>
          {weddingDate}
      </div>
      <div className="pure-u-5-12">
          {subRowsLabels}
      </div>
      <div className="pure-u-2-12">
          {subRowsDates}
      </div>
      <div className="pure-u-2-12">
          {entry.isBooking ? booking : ''}
      </div>
    </div>
  );
};

export default Entry;