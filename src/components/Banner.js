import React from "react";

const Banner = ({ title, subtitle, additionalInformation, children }) => {
  return (
    <div className="banner rounded-large shadow">
      <div className="inner">
        <h1 className="banner-title">{title}</h1>
        <h2 className="subtitle">{subtitle}</h2>
        <h4 className="additional-info">{additionalInformation}</h4>
        <div className="banner-content">{children}</div>
      </div>
    </div>
  );
};

export default Banner;
