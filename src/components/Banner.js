import React from "react";

/**
 * Wrapper for Countdown component on Home Page, but can also be used for other generic banners across the website
 * @component
 * @param {{title: String, subtitle: String, additionalInformation: String, children: any}} props
 * @returns {React.ReactElement}
 */
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
