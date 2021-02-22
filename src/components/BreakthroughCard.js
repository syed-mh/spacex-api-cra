import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const breakthroughCard = ({ number, cardDetails }) => {
  return (
    <article className="breakthrough-card">
      <div className="card-content rounded shadow">
        <h6 className="breakthrough-date rounded shadow">
          <span>#{number}:</span>{" "}
          {new Date(cardDetails.event_date_utc).toLocaleDateString("en", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </h6>
        {cardDetails.links.article ? (
          <a href={cardDetails.links.article} target="_blank" rel="noreferrer">
            <h3 className="breakthrough-title">
              {cardDetails.title}
              <FontAwesomeIcon icon={["fas", "external-link-alt"]} />
            </h3>
          </a>
        ) : (
          <h3 className="breakthrough-title">{cardDetails.title}</h3>
        )}
        <h5>Excerpt:</h5>
        <p className="breakthrough-summary">{cardDetails.details}</p>
      </div>
      <div className="card-number">
        <span></span>
      </div>
    </article>
  );
};

export default breakthroughCard;
