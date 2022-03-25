import React from "react";

import "./LoadingSpinner.css";

const loadingSpinner = (props) => {
  return (
    <div className="loading-spinner">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default loadingSpinner;
