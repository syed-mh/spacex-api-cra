import React from "react";
import imagePlaceholder from "../images/placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const LaunchCard = ({ launch }) => {
  return (
    <article className="card-container">
      <main className="card rounded-large shadow">
        <div className="card-image">
          <img
            className="rounded launch-photo"
            src={launch.featuredImage ? launch.featuredImage : imagePlaceholder}
            alt={launch.name}
          />
          <span className="mission-patch-container rounded shadow">
            <img
              className="mission-patch"
              src={launch.patch}
              alt="Mission Patch"
            />
          </span>
          <span
            className={`mission-status ${
              launch.success === null
                ? ""
                : launch.success
                ? "success"
                : "failure"
            } rounded shadow`}
          >
            <p>
              {launch.success === null
                ? "Unconfirmed"
                : launch.success
                ? "Success"
                : "Failure"}
            </p>
          </span>
        </div>
        <Link to={`/launches/${launch.id}`}>
          <h3 className="card-title">{launch.name}</h3>
        </Link>
        <h6 className="card-date">{launch.date_utc}</h6>
        {launch.links && (
          <div className="external-links">
            <span>External Links:</span>
            {launch.links.google_maps && (
              <a
                href={launch.links.google_maps}
                target="_blank"
                rel="noreferrer noopener"
              >
                <FontAwesomeIcon icon={["fas", "map-marker-alt"]} />
              </a>
            )}
            {launch.links.article && (
              <a
                href={launch.links.article}
                target="_blank"
                rel="noreferrer noopener"
              >
                <FontAwesomeIcon icon={["fas", "newspaper"]} />
              </a>
            )}
            {launch.links.reddit && (
              <a
                href={launch.links.reddit}
                target="_blank"
                rel="noreferrer noopener"
              >
                <FontAwesomeIcon icon={["fab", "reddit-alien"]} />
              </a>
            )}
            {launch.links.webcast && (
              <a
                href={launch.links.webcast}
                target="_blank"
                rel="noreferrer noopener"
              >
                <FontAwesomeIcon icon={["fab", "youtube"]} />
              </a>
            )}
            {launch.links.wikipedia && (
              <a
                href={launch.links.wikipedia}
                target="_blank"
                rel="noreferrer noopener"
              >
                <FontAwesomeIcon icon={["fab", "wikipedia-w"]} />
              </a>
            )}
          </div>
        )}
        {launch.details && (
          <span className="card-details">{launch.details}</span>
        )}
        {!(launch.success === null) && (
          <span className="view-launch-button rounded shadow-long">
            <Link to={`/launches/${launch.id}`}>View Launch</Link>
          </span>
        )}
      </main>
    </article>
  );
};

export default LaunchCard;
