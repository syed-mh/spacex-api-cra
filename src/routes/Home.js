import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

// IMPORT COMPONENTS
import Banner from "../components/Banner";
import BreakthroughCard from "../components/BreakthroughCard";
import Button from "../components/Button";
import Countdown from "../components/Countdown";
import LaunchCard from "../components/LaunchCard";
import LaunchLineChart from "../components/LaunchLineChart";
import Preloader from "../components/Preloader";
import SectionTitle from "../components/SectionTitle";

// IMPORT API FETCH CLASS
import APIFetchEvents from "../scripts/APIFetchEvents";

/**
 * Container component for Home Page
 * @component
 * @returns {React.ReactElement}
 */
const Home = () => {
  const [data, setData] = useState({});
  const [preloader, setPreloader] = useState(true);

  const APIFetch = useRef(new APIFetchEvents());

  useEffect(() => {
    APIFetch.current.set("home", setData);
  }, []);

  console.log(data);

  useEffect(() => Object.keys(data).length && setPreloader(false), [data]);

  if (preloader) {
    return <Preloader />;
  } else {
    return (
      <>
        <Helmet>
          <title>Home | SpaceX Data Aggregation by Syed MH</title>
        </Helmet>
        <Banner
          title="Next Launch"
          subtitle={data.nextLaunch.name}
          additionalInformation={new Date(
            data.nextLaunch.date_utc
          ).toLocaleDateString("en", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        >
          <Countdown date={data.nextLaunch.date_utc} />
        </Banner>
        <section className="narrow page-section">
          <SectionTitle>About the Project</SectionTitle>
          <p className="section-description">
            While this project is in no way, shape or form afilliated with Space
            X, it derives all of its data from the{" "}
            <a
              href="https://github.com/r-spacex/SpaceX-API/tree/master/docs/v4"
              target="_blank"
              rel="noreferrer"
            >
              unofficial Space X API
            </a>
            , which gets its data from SpaceX directly. The purpose of this
            project is to showcase my skills as a developer, and to also show
            people some fun information about what Space X gets up to. Click the
            button below to learn more about the project, and explore this
            Single Page Application to see more from Space X!
          </p>
          <Button to="/about">Learn More</Button>
        </section>
        <section className="past-launches page-section">
          <SectionTitle>Recent Launches</SectionTitle>
          <div className="content-container">
            {data.pastLaunches.map((launch, index) => {
              return index < 3 && <LaunchCard launch={launch} key={index} />;
            })}
          </div>
          <Button to="/launches">View All</Button>
        </section>
        <section className="stats page-section">
          <SectionTitle>Launch History</SectionTitle>
          <div className="content-container narrow">
            <LaunchLineChart data={data.analytics} />
          </div>
        </section>
        <section className="breakthroughs page-section">
          <SectionTitle>Latest Breakthroughs</SectionTitle>
          <div className="content-container">
            {data.breakthroughs.map((breakthrough, index) => {
              return (
                index < 4 && (
                  <BreakthroughCard
                    cardDetails={breakthrough}
                    number={index + 1}
                    key={breakthrough.id}
                  />
                )
              );
            })}
          </div>
        </section>
      </>
    );
  }
};

export default Home;
