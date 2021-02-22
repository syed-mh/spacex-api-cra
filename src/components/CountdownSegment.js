import React from "react";

const CountdownSegment = ({ name, value }) => {
  return (
    <span className={`${name.toLowerCase()} countdown-segment`}>
      <h2 className="number">{value}</h2>
      <h5 className="title">{name}</h5>
    </span>
  );
};

export default CountdownSegment;
