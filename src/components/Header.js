import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => {
    return(
        <div id='main-header' classNames='shadow long'>
            <nav>
                <div className='left'>

                </div>
                <div className='right'>
                    <ul>
                        <li className='active'>
                            <NavLink to='/' activeClassName='active'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/launches' activeClassName='active'>Launches</NavLink>
                        </li>
                        <li>
                            <NavLink to='/rockets' activeClassName='active'>Rockets</NavLink>
                        </li>
                        <li>
                            <NavLink to='/ships' activeClassName='active'>Ships</NavLink>
                        </li>
                        <div className='primary-button-container rounded'>
                            <NavLink to='/about' className='primary-button large'>About</NavLink>
                        </div>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;