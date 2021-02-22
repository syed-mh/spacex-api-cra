import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Individual menu item component
 * @component
 * @param {{exact: Boolean, to: String, className: String, children: any}} props
 * @returns {React.ReactElement}
 */
const MenuItem = ({ exact, to, className, children }) => {
  return exact ? (
    <NavLink exact to={to} className={className} activeClassName="active">
      {children}
    </NavLink>
  ) : (
    <NavLink to={to} className={className} activeClassName="active">
      {children}
    </NavLink>
  );
};

export default MenuItem;
