import React from 'react';
import MenuItem from './MenuItem'
import Button from './Button'
import {NavLink} from 'react-router-dom';
import Logo from './Logo'

const Header = () => {
    return(
        <header id='main-header' className='shadow-long'>
            <nav>
                <span className='left'>
                    <NavLink to='/' className='logo-wrapper'>
                        <Logo />
                    </NavLink>
                </span>
                <span className='right'>
                    <ul>
                        <MenuItem to='/'>Home</MenuItem>
                        <MenuItem to='/history'>History</MenuItem>
                        <MenuItem to='launches'>Launches</MenuItem>
                        <MenuItem to='rockets'>Rockets</MenuItem>
                        <MenuItem to='ships'>Ships</MenuItem>
                        <MenuItem to='launchpads'>Launchpads</MenuItem>
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