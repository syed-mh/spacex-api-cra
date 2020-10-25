import React from 'react';

const Button = (props) => {
    return (
        <button className={`primary-button ${props.large ? 'large rounded-large' : 'rounded'} shadow-long`}>
            <span className='button-text'>{props.children}
                {props.icon ?
                    null
                    : 
                    null}
            </span>
        </button>
    )
}

export default Button;