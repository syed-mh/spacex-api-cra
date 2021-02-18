import React from 'react'
import imagePlaceholder from '../images/placeholder.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

import Button from './Button'
// import articleLogo from '../images/article.png'
// import wikipediaLogo from '../images/wikipedia.png'
// import redditLogo from '../images/reddit.png'
// import youtubeLogo from '../images/youtube.png'

const LaunchCard = (props) => {

    return (
        <article className='card-container' >
            <main className='card rounded-large shadow'>
                <div className='card-image'>
                    <img className='rounded launch-photo' src={props.cardDetails.links.flickr.original.length ? props.cardDetails.links.flickr.original[0] : imagePlaceholder} alt={props.cardDetails.name}/>
                    <span className='mission-patch-container rounded shadow'>
                        <img className='mission-patch' src={props.cardDetails.links.patch.small} alt='Mission Patch' />
                    </span>
                    <span className={`mission-status ${props.cardDetails.success ? 'success' : 'failure'} rounded shadow`}>
                        <p>{props.cardDetails.success ? 'Success' : 'Failure'}</p>
                    </span>
                </div>
                <NavLink to={`/launches/${props.cardDetails.id}`}>
                    <h3 className='card-title'>{props.cardDetails.name}</h3>
                </NavLink>
                <h6 className='card-date'>{new Date(props.cardDetails.date_utc).toLocaleDateString('en', {day: 'numeric', month: 'short', year: 'numeric', hour:'numeric', minute: 'numeric', second: 'numeric'})}</h6>
                <div className='external-links'>
                <span>External Links:</span>
                    {props.cardDetails.links.google_maps && <a href={props.cardDetails.links.google_maps} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fas','map-marker-alt' ]} /></a>}
                    {props.cardDetails.links.article && <a href={props.cardDetails.links.article} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fas', 'newspaper']} /></a>}
                    {props.cardDetails.links.reddit && <a href={props.cardDetails.links.reddit.launch} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fab', 'reddit-alien']} /></a>}
                    {props.cardDetails.links.webcast && <a href={props.cardDetails.links.webcast} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fab', 'youtube']} /></a>}
                    {props.cardDetails.links.wikipedia && <a href={props.cardDetails.links.wikipedia} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fab', 'wikipedia-w']} /></a>}
                </div>
                <span className='card-details'>{props.cardDetails.details}</span>
                <div className='view-launch-button-container'>
                    <Button type='secondary' to={`/launches/${props.cardDetails.id}`}>View Launch</Button>
                </div>
            </main>
        </article>
    )

}

export default LaunchCard