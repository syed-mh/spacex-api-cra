import React from 'react';
import {NavLink} from 'react-router-dom';

const MenuItem = (props) => {
    return(
            <NavLink to={props.to} activeClassName='active' exact>{props.children}</NavLink>
    )
}

export default MenuItem;