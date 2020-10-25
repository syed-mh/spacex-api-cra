import React from 'react';
import CountdownSegment from './CountdownSegment';

const Countdown = (props) => {
    return (
        <div className='countdown-wrapper'>
            <CountdownSegment name='Days' value={6} />
            <CountdownSegment name='Hours' value={5} />
            <CountdownSegment name='Minutes' value={32} />
            <CountdownSegment name='Seconds' value={24} />
        </div>
    )
}

export default Countdown;