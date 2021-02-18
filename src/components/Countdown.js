import React, { useState, useEffect } from 'react';
import CountdownSegment from './CountdownSegment';

const Countdown = (props) => {

    const [countdown, setCountdown] = useState(null)

    const calculateCountdown = () => {

        const   endDate     = new Date(props.date),
                startDate   = new Date(),
                difference  = (endDate - startDate) >= 0 ? (endDate - startDate)/1000 : 0
                            
            if(difference) {
                            
                const days      = Math.floor(difference / 3600 / 24)
                const hours     = Math.floor((difference - (days * 3600 * 24)) / 3600)
                const minutes   = Math.floor((difference - (days * 3600 * 24) - (hours * 3600)) / 60)
                const seconds   = Math.floor(difference - (days * 3600 * 24) - (hours * 3600) - (minutes * 60))

                setCountdown({
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds
                })

            } else {

                setCountdown({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                })

            }

    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(calculateCountdown, [])

    useEffect (() => {
        
        const countdownInterval = setInterval(calculateCountdown, 1000)

        return (() => clearInterval(countdownInterval))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='countdown-wrapper'>
            <CountdownSegment
                name='Days'
                value={countdown ? countdown.days : 0}
            />
            <CountdownSegment
                name='Hours'
                value={countdown ? countdown.hours : 0}
            />
            <CountdownSegment
                name='Minutes'
                value={countdown ? countdown.minutes : 0}
            />
            <CountdownSegment
                name='Seconds'
                value={countdown ? countdown.seconds : 0}
            />
        </div>
    )
}

export default Countdown;