import React from "react";

const Preloader = () => {
  return (
    <div id="preloader">
      <span className="progress shadow-long">
        <span className="fill">
          <span className="stub" />
        </span>
      </span>
    </div>
  );
};

export default Preloader;
