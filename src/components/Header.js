import React from 'react';
import MenuItem from './MenuItem'
import Button from './Button'
import {NavLink} from 'react-router-dom';
import logo from '../images/logo.png'

const Header = () => {
    return(
        <header id='main-header' className='shadow-long'>
            <nav>
                <span className='left'>
                    <NavLink to='/' className='logo-wrapper'>
                        <img className='website-logo' src={logo} alt='Website Logo' />
                    </NavLink>
                </span>
                <span className='right'>
                    <ul>
                        <MenuItem to='/'>Home</MenuItem>
                        <MenuItem to='launches'>Launches</MenuItem>
                        <MenuItem to='rockets'>Rockets</MenuItem>
                        <MenuItem to='ships'>Ships</MenuItem>
                        <span className='primary-button-container'>
                            <Button large={true}>
                                <MenuItem to='/about'>About</MenuItem>
                            </Button>
                        </span>
                    </ul>
                </span>
            </nav>
        </header>
    )
}

export default Header;