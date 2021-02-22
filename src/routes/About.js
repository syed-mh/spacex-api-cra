import React from "react";
import { Helmet } from "react-helmet";

/**
 * Container component for About Page
 * @component
 * @returns {React.ReactElement}
 */
const About = () => {
  return (
    <>
      <Helmet>
        <title>About | Spacex Data Aggregation by SyedMh</title>
      </Helmet>
      <div className="about">About</div>
    </>
  );
};

export default About;
