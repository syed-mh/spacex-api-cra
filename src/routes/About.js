import React, { useEffect } from 'react';

const About = () => {

    useEffect(() => {
        document.title = 'About | SpaceX Data Aggregation by Syed MH'
    },[])

    return(
        <div className='about'>About</div>
    )
}

export default About;