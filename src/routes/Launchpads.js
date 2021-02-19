import React, { useEffect, useState } from 'react'
import Preloader from '../components/Preloader'
import APIFetchEvents from '../scripts/APIFetchEvents'

const Launchpads = () => {

    const [ launchpads, setLaunchpads ] = useState([])
    const [ preloader, setPreloader ] = useState(true)

    const APIFetch = new APIFetchEvents([{endpoint: 'launchpads', setter: setLaunchpads}])

    useEffect(() => {
        launchpads.length && setPreloader(false)
    }, [launchpads])

    useEffect(() => {
        document.title = 'Launchpads | SpaceX Data Aggregation by Syed MH'
        APIFetch.get()
    },[])

    if(preloader) {
        return <Preloader />
    } else {
        return (
            <div>
                <pre>
                    {JSON.stringify(launchpads, null, 4)}
                </pre>
            </div>
        )
    }
}

export default Launchpads