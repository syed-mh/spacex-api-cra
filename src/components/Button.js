import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Renders buttons across the website
 * @component
 * @param {{type: String, large: Boolean, to: String, icon: String, link: String, children: any}} props
 * @returns {React.ReactElement}
 */
const Button = ({ type, large, to, children, icon, link }) => {
  return (
    <button
      className={`${type ? `${type}-button` : "primary-button shadow-long"} ${
        !type && (large ? "large rounded-large" : "rounded")
      } app-button`}
    >
      {to && (
        <Link to={to}>
          <span className="button-text">
            {children}
            {icon && <FontAwesomeIcon icon={icon} />}
          </span>
        </Link>
      )}
      {link && (
        <a href={link} target="_blank" rel="noreferrer">
          <span className="button-text">
            {children}
            <FontAwesomeIcon icon="external-link-alt" />
          </span>
        </a>
      )}
      {!link && !to && (
        <span className="button-text">
          {children}
          {icon && <FontAwesomeIcon icon={icon} />}
        </span>
      )}
    </button>
  );
};

export default Button;
