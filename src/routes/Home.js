import React from 'react';
import Banner from '../components/Banner'
import Countdown from '../components/Countdown'

const Home = () => {
    return(
        <Banner title='Next Launch' subtitle='Turksat 5A' additionalInformation='1-Oct-2020'>
            <Countdown date='' />
        </Banner>
    )
}

export default Home;