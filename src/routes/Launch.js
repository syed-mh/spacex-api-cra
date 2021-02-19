import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Preloader from '../components/Preloader'
import APIFetchEvents from '../scripts/APIFetchEvents'

import imagePlaceholder from '../images/placeholder.png'

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
                style = `height: ${launchHighlightContainer.current.offsetHeight}px;`
            }
            launchHighlightImage.current.setAttribute('style', style)
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
                    <div ref={launchHighlightImage} className='launch-image-container shadow-long rounded'>
                        <img className='launch-image shadow-long rounded' src={launch.links.flickr.original.length ? launch.links.flickr.original[0] : imagePlaceholder} alt={launch.name} />
                        <img className='mission-patch rounded shadow' src={launch.links.patch.large} alt='Flight Patch'/>
                    </div>
                    <div ref={launchHighlightContainer} className='launch-highlights-container'>
                        <h1 className='launch-title'>
                            <span className='flight-number'>{`#${launch.flight_number}:`}</span>
                            {launch.name}
                        </h1>
                        <h4 className='launch-date'>{new Date(launch.date_utc).toLocaleDateString('en', {day: 'numeric', month: 'short', year: 'numeric', hour:'numeric', minute: 'numeric', second: 'numeric'})}</h4>
                        <section className='external-links'>
                            <h6>External Links:</h6>
                                {launch.links.google_maps && <a href={launch.links.google_maps} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fas','map-marker-alt' ]} /></a>}
                                {launch.links.article && <a href={launch.links.article} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fas', 'newspaper']} /></a>}
                                {Object.values(launch.links.reddit) && <a href={Object.values(launch.links.reddit).find(item => item)} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fab', 'reddit-alien']} /></a>}
                                {launch.links.webcast && <a href={launch.links.webcast} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fab', 'youtube']} /></a>}
                                {launch.links.wikipedia && <a href={launch.links.wikipedia} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fab', 'wikipedia-w']} /></a>}
                        </section>
                        <section>
                            <h6>Mission Status:</h6>
                            <p className={`rounded shadow detail-info mission-status ${launch.success === null ? '' : launch.success ? 'success' : 'failure'}`}>
                                {launch.success === null ? 'Unconfirmed ' : launch.success ? 'Successful' : 'Failed'}
                            </p>
                        </section>
                        <section>
                            <h6>Manned Mission:</h6>
                            <p className='detail-info'>
                                {launch.crew.length ? `${launch.crew.length} Crew Members` : 'No'}
                            </p>
                        </section>
                        <section>
                            <h6>Launched From:</h6>
                            <p className='detail-info'>
                                {`${launch.launchpad.full_name}`}
                            </p>
                            <p className='detail-info'>
                                {`${launch.launchpad.locality}, ${launch.launchpad.region}`}
                            </p>
                        </section>
                        <section>
                            <h6>Mission Summary:</h6>
                            <p className='detail-info summary'>
                                {launch.details}
                            </p>
                        </section>
                    </div>
                </div>
            </section>
            <section className='page-section'>

            </section>
        </>
    )
}

export default Launch