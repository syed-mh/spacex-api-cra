import React, { useEffect, useState } from 'react'
import Preloader from '../components/Preloader'
import APIFetchEvents from '../scripts/APIFetchEvents'
import { Helmet } from 'react-helmet'

const APIFetch = new APIFetchEvents()

const Launchpads = () => {

    const [ launchpads, setLaunchpads ] = useState([])
    const [ preloader, setPreloader ] = useState(true)

    console.log(launchpads)

    useEffect(() => {
        launchpads.length && setPreloader(false)
    }, [launchpads])

    useEffect(() => {
        APIFetch.set('launchpads', setLaunchpads)
    },[])

    if(preloader) {
        return <Preloader />
    } else {
        return (
            <>
                <Helmet>
                    <title>Launchpads | SpaceX Data Aggregation by Syed MH</title>
                </Helmet>
                <div>
                    <pre>
                        {JSON.stringify(launchpads, null, 4)}
                    </pre>
                </div>
            </>
        )
    }
}

export default Launchpads