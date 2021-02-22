import React from "react";

const SectionTitle = ({ children }) => {
  return (
    <h2 className="section-title">
      {children}
      <span className="underline" />
    </h2>
  );
};

export default SectionTitle;
