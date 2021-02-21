import React, { useEffect, useState } from 'react'
import Preloader from '../components/Preloader'
import LaunchCard from '../components/LaunchCard'

import APIFetchEvents from '../scripts/APIFetchEvents'
import { Helmet } from 'react-helmet'

const APIFetch = new APIFetchEvents()

const Launches = () => {

    const [ data, setData ] = useState({})
    const [ preloader, setPreloader ] = useState(true)


    useEffect(() => {

        APIFetch.set('launches', setData)

    },[])

    useEffect(() => {
        if(data.launches) {
            setPreloader(false)
        }
    }, [data])

    console.log(data.launches)

    if(preloader) {
        return <Preloader />
    } else {
        return(
            <>
                <Helmet>
                    <title>Launches | SpaceX Data Aggregation by Syed MH</title>
                </Helmet>
                <div className='launches'>
                    {data.launches.map(launch => {
                        return <LaunchCard key={launch.id} cardDetails={launch} />
                    })}
                    <pre>
                        {JSON.stringify(data.launches, null, 4)}
                    </pre>
                </div>
            </>
        )
    }
}

export default Launches;