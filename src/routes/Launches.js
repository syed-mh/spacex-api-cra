import React, { useEffect, useState } from 'react';
import Preloader from '../components/Preloader';
import APIFetchEvents from '../js/APIFetchEvents';

const Launches = () => {

    const [ launches, setLaunches ]             = useState([])
    const [ results, setResults ]               = useState([])
    const [ searchCriteria, setSearchCriteria ] = useState([])
    const [ preloader, setPreloader ]           = useState(true)

    const APIFetch = new APIFetchEvents([{endpoint: 'launches', setter: setLaunches, reverse: true}])

    useEffect(() => {
        
        document.title = 'Launches | SpaceX Data Aggregation by Syed MH'
        APIFetch.get()
    
    },[])

    useEffect(() => {
        
        launches.length && setPreloader(false)

    }, [launches])

    if(preloader) {
        return <Preloader />
    } else {
        return(
            <div className='launches'>
                <pre>
                    {JSON.stringify(launches, null, 4)}
                </pre>
            </div>
        )
    }
}

export default Launches;