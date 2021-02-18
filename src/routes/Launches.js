import React, { useEffect, useState } from 'react'
import Preloader from '../components/Preloader'
import APIFetchEvents from '../js/APIFetchEvents'
import LaunchCard from '../components/LaunchCard'

const Launches = () => {

    const [ launches, setLaunches ]             = useState([])
    const [ results, setResults ]               = useState([])
    const [ searchCriteria, setSearchCriteria ] = useState([])
    const [ preloader, setPreloader ]           = useState(true)
    const [ processed, setProcessed ]           = useState(false)

    const APIFetch = new APIFetchEvents([{endpoint: 'launches', setter: setLaunches, reverse: true}])

    useEffect(() => {
        
        document.title = 'Launches | SpaceX Data Aggregation by Syed MH'
        APIFetch.get()
    
    },[])

    console.log(launches)

    useEffect(() => {
        
        if(launches.length && !processed) {
            setLaunches(launches.sort((elementOne, elementTwo) => new Date(elementOne.date_utc) > new Date(elementTwo.date_utc) ? -1 : 1))
            setProcessed(true)
        }

        launches.length && processed && setPreloader(false)

    }, [launches, processed])

    if(preloader) {
        return <Preloader />
    } else {
        return(
            <div className='launches'>
                {launches.map(launch => {
                    return <LaunchCard key={launch.id} cardDetails={launch} />
                })}
                <pre>
                    {JSON.stringify(launches, null, 4)}
                </pre>
            </div>
        )
    }
}

export default Launches;