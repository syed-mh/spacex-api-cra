import React from "react";

/**
 * Global section title component
 * @component
 * @param {{children: any}} props
 * @returns {React.ReactElement}
 */
const SectionTitle = ({ children }) => {
  return (
    <h2 className="section-title">
      {children}
      <span className="underline" />
    </h2>
  );
};

export default SectionTitle;
