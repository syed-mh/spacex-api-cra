import React from "react";
import { Helmet } from "react-helmet";

/**
 * Container component for 404 Page
 * @component
 * @returns {React.ReactElement}
 */
const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 | SpaceX Data Aggregation by SyedMH</title>
      </Helmet>
      <div>Not Found</div>
    </>
  );
};

export default PageNotFound;
