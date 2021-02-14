import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = (props) => {
    return (
        <button className={`primary-button ${props.large ? 'large rounded-large' : 'rounded'} shadow-long`}>
            {props.to && 
                <Link to={props.to}>
                    <span className='button-text'>
                        {props.children}
                        {props.icon && <FontAwesomeIcon icon={['fas', props.icon]} />}
                    </span>
                </Link>
            }
            {props.link &&
                <a href={props.link} target='_blank' rel="noreferrer">
                    <span className='button-text'>
                        {props.children}
                        <FontAwesomeIcon icon={['fas', 'external-link-alt']} />
                    </span>
                </a>
            }
            {!props.link && !props.to &&
                <span className='button-text'>
                    {props.children}
                    {props.icon && <FontAwesomeIcon icon={['fas', props.icon]} />}
                </span>
            }
        </button>
    )
}

export default Button;