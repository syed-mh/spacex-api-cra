import React from 'react';

const Banner = (props) => {
    return (
        <div className='banner rounded-large shadow'>
            <div className='inner'>
                <h1 className='banner-title'>{props.title}</h1>
                <h2 className='subtitle'>{props.subtitle}</h2>
                <h4 className='additional-info'>{props.additionalInformation}</h4>
                {props.children}
            </div>
        </div>
    )
}

export default Banner;