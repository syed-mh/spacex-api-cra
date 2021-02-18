import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import Preloader from '../components/Preloader'
import APIFetchEvents from '../js/APIFetchEvents'

const Launch = () => {

    const [ launch, setLaunch ] = useState({})
    const [ launchpads, setLaunchpads ] = useState([])
    const [ ships, setShips ] = useState([])
    const [ rockets, setRockets ] = useState([])
    const [ crews, setCrew ] = useState([])
    const [ payloads, setPayloads ] = useState([])

    const [ preloader, setPreloader] = useState(true)
    const [ processed, setProcessed ] = useState(false)

    const [ viewport, setViewport ] = useState({})

    const launchHighlightImage = useRef()
    const launchHighlightContainer = useRef()

    const { resourceId } = useParams()

    const APIFetch = new APIFetchEvents([
        {endpoint: `launches/${resourceId}`, setter: setLaunch},
        {endpoint: 'launchpads', setter: setLaunchpads},
        {endpoint: 'ships', setter: setShips},
        {endpoint: 'rockets', setter: setRockets},
        {endpoint: 'crew', setter: setCrew},
        {endpoint: 'payloads', setter: setPayloads}
    ])

    console.log(document.body.clientWidth, document.body.clientHeight)
    const handleResize = () => setViewport({width: document.body.clientWidth, height: document.body.clientHeight})

    useEffect(() => {

        APIFetch.get()
        setViewport({width: document.body.clientWidth, height: document.body.clientHeight})
        window.addEventListener('resize', handleResize)

        return (() => window.removeEventListener('resize', handleResize))

    }, [])

    useEffect(() => {
        if(!preloader && launchHighlightImage.current && launchHighlightContainer.current) {
            let style;
            if(viewport.width <= 768) {
                style = ''
            } else {
                style = `max-height: ${launchHighlightContainer.current.offsetHeight}px; min-height: ${launchHighlightContainer.current.offsetHeight}px`
            }
            launchHighlightImage.current.setAttribute('style', style)
            console.log(viewport, launchHighlightImage.current.style, launchHighlightContainer.current.offsetHeight)
        }

    }, [preloader, viewport, launchHighlightImage])

    useEffect(() => {

        if(ships.length && rockets.length && launchpads.length && crews.length && payloads.length && Object.keys(launch).length && !processed) {

            const _launch = {...launch}
            _launch.ships = ships.filter(ship => launch.ships.includes(ship.id))
            _launch.fairings.ships = ships.filter(ship => launch.fairings.ships.includes(ship.id))
            _launch.launchpad = launchpads.find(launchpad => launchpad.id === launch.launchpad)
            _launch.rocket = rockets.find(rocket => rocket.id === launch.rocket)
            _launch.crew = crews.filter(crew => launch.crew.includes(crew.id))
            _launch.payloads = payloads.filter(payload => launch.payloads.includes(payload.id))
            
            setCrew([])
            setShips([])
            setRockets([])
            setLaunchpads([])
            setPayloads([])
            setLaunch({..._launch})

            setProcessed(true)

            

        }


    }, [launch, ships, launchpads, rockets, crews, payloads ,processed])

    useEffect(() => {

        const title = document.title.split(' | ')
        document.title = Object.keys(launch).length ? `${launch.name} | ${title[1]} ` : title.join(' | ')
    
    }, [launch])

    useEffect(() => processed && setPreloader(false), [processed])

    console.log(launch)

    if(preloader) {

        return <Preloader />

    }

    return (
        <>
            <section className='launch-opener'>
                <div className='content-container'>
                    <img ref={launchHighlightImage} className='launch-image shadow-long rounded' src={launch.links.flickr.original.length ? launch.links.flickr.original[0] : null} alt={launch.name} />
                    <div ref={launchHighlightContainer} className='launch-highlights-container'>
                        <h1 className='launch-title'>
                            <span className='flight-number'>{`#${launch.flight_number}:`}</span>
                            {launch.name}
                        </h1>
                        <h3 className='launch-date'>{new Date(launch.date_utc).toLocaleDateString('en', {day: 'numeric', month: 'short', year: 'numeric', hour:'numeric', minute: 'numeric', second: 'numeric'})}</h3>
                    </div>
                </div>
            </section>
            <section className='page-section'>

            </section>
        </>
    )
}

export default Launch