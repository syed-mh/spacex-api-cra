import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Preloader from '../components/Preloader'
import APIFetchEvents from '../scripts/APIFetchEvents'

import imagePlaceholder from '../images/placeholder.png'

const Launch = () => {

    const [ launch, setLaunch ] = useState({})
    const [ preloader, setPreloader] = useState(true)

    const APIFetch = useRef(new APIFetchEvents())

    const { resourceId } = useParams()

    let backgroundImage = useRef()

    useEffect(() => {

        APIFetch.current.set(`launches/${resourceId}`, setLaunch)

    }, [resourceId])

    useEffect(() => {
        if(Object.keys(launch).length) {
            backgroundImage.current = {
                backgroundImage: `url(${launch.links.flickr.original.length ? launch.links.flickr.original[0] : imagePlaceholder})`
            }
            setPreloader(false)
        }
    }, [launch])

    if(preloader) {

        return <Preloader />

    }

    return (
        <>
            <section className='launch-opener'>
                <div className='content-container'>
                    <div className='launch-image-container shadow-long rounded' style={backgroundImage.current}>
                        <img className='mission-patch rounded shadow' src={launch.links.patch.large} alt='Flight Patch'/>
                    </div>
                    <div className='launch-highlights-container'>
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