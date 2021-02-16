import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = (props) => {
    return (
        <button className={`${props.type ? `${props.type}-button` : 'primary-button shadow-long'} ${!props.type && (props.large ? 'large rounded-large' : 'rounded')} app-button`}>
            {props.to && 
                <Link to={props.to}>
                    <span className='button-text'>
                        {props.children}
                        {props.icon && <FontAwesomeIcon icon={props.icon} />}
                    </span>
                </Link>
            }
            {props.link &&
                <a href={props.link} target='_blank' rel="noreferrer">
                    <span className='button-text'>
                        {props.children}
                        <FontAwesomeIcon icon='external-link-alt' />
                    </span>
                </a>
            }
            {!props.link && !props.to &&
                <span className='button-text'>
                    {props.children}
                    {props.icon && <FontAwesomeIcon icon={props.icon} />}
                </span>
            }
        </button>
    )
}

export default Button;