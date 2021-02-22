import React, { useEffect, useRef, useState } from "react";
import Preloader from "../components/Preloader";
import APIFetchEvents from "../scripts/APIFetchEvents";
import { Helmet } from "react-helmet";

/**
 * Container component for Launchpads Page
 * @component
 * @returns {React.ReactElement}
 */
const Launchpads = () => {
  const [launchpads, setLaunchpads] = useState([]);
  const [preloader, setPreloader] = useState(true);

  const APIFetch = useRef(new APIFetchEvents());

  console.log(launchpads);

  useEffect(() => {
    launchpads.length && setPreloader(false);
  }, [launchpads]);

  useEffect(() => {
    APIFetch.current.set("launchpads", setLaunchpads);
  }, []);

  if (preloader) {
    return <Preloader />;
  } else {
    return (
      <>
        <Helmet>
          <title>Launchpads | SpaceX Data Aggregation by Syed MH</title>
        </Helmet>
        <div>
          <pre>{JSON.stringify(launchpads, null, 4)}</pre>
        </div>
      </>
    );
  }
};

export default Launchpads;
