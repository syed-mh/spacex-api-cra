import React from "react";

/**
 * Renders footer across the website
 * @component
 * @returns {React.ReactElement}
 */
const Footer = () => {
  return (
    <footer className="website-footer">
      <p>
        Open Source project, built with &#128156; by{" "}
        <a href="https://syedmh.com/" target="_blank" rel="noreferrer">
          Syed MH
        </a>
      </p>
    </footer>
  );
};

export default Footer;
