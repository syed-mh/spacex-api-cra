import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuItem = (props) => {
    return(
        props.exact
            ?
            <NavLink exact to={props.to} className={props.className} activeClassName='active'>{props.children}</NavLink>
            :
            <NavLink to={props.to} className={props.className} activeClassName='active'>{props.children}</NavLink>
    )
}

export default MenuItem