import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from './Button'
import MenuItem from './MenuItem'
import Logo from './Logo'

const Header = () => {

    const mobileNav = useRef()
    const menuOpen = useRef()
    const menuClose = useRef()
    const menuContainer = useRef()
    const menuItems = useRef()
    
    
    useEffect(() => {
        
        mobileNav.current.addEventListener('click', clickHandler)    
        return (() => mobileNav.removeEventListener('click', clickHandler))

    }, [])
    
    const clickHandler = e => {
        
        if(menuOpen.current.contains(e.target)) {
            menuContainer.current.classList.add('active')
        }

        if(menuClose.current.contains(e.target)) {
            menuContainer.current.classList.remove('active')
        }

        if(menuItems.current.contains(e.target)) {
            menuContainer.current.classList.remove('active')
        }

    }

    return(
        <header id='main-header' className='shadow-long'>
        <div className='container'>
                <span className='left'>
                    <NavLink to='/' className='logo-wrapper'>
                        <Logo />
                    </NavLink>
                </span>
                <span className='right'>
                    <nav className='desktop-nav'>
                        <div className='menu-items-holder'>
                            <MenuItem exact={true} to='/'>Home</MenuItem>
                            <MenuItem to='/launches'>Launches</MenuItem>
                            <MenuItem to='/launchpads'>Launchpads</MenuItem>
                            <span className='primary-button-container'>
                                <Button large={true}>
                                    <MenuItem exact={true} to='/about'>About</MenuItem>
                                </Button>
                            </span>
                        </div>
                    </nav>
                    <nav className='mobile-nav' ref={mobileNav}>
                    <div className='menu-opener' ref={menuOpen} >
                        <FontAwesomeIcon icon={['fas', 'bars']} />
                    </div>
                    <div className='menu-container' ref={menuContainer}>
                        <div className='menu-close' ref={menuClose}>
                            <FontAwesomeIcon icon={['fas', 'times']} />
                        </div>
                        <div className='menu-items-holder' ref={menuItems}>
                            <MenuItem exact={true} to='/'>Home</MenuItem>
                            <MenuItem to='launches'>Launches</MenuItem>
                            <MenuItem to='launchpads'>Launchpads</MenuItem>
                            <MenuItem exact={true} to='/about' className='call-to-action'>About</MenuItem>
                        </div>
                    </div>
                    </nav>
                </span>
        </div>
        </header>
    )
}

export default Header