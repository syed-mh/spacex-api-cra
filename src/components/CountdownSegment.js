import React from 'react';

const CountdownSegment = (props) => {
    return (
        <span className={`${props.name.toLowerCase()} countdown-segment`}>
            <h2 className='number'>{props.value}</h2>
            <h5 className='title'>{props.name}</h5>
        </span>
    )
}

export default CountdownSegment;