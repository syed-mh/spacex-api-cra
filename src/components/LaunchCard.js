import React from 'react'
import imagePlaceholder from '../images/placeholder.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

import Button from './Button'

const LaunchCard = (props) => {
    return (
        <article className='card-container' >
            <main className='card rounded-large shadow'>
                <div className='card-image'>
                    <img className='rounded launch-photo' src={props.launch.featuredImage ? props.launch.featuredImage : imagePlaceholder} alt={props.launch.name}/>
                    <span className='mission-patch-container rounded shadow'>
                        <img className='mission-patch' src={props.launch.patch} alt='Mission Patch' />
                    </span>
                    <span className={`mission-status ${props.launch.success === null ? '' : props.launch.success ? 'success' : 'failure'} rounded shadow`}>
                        <p>{
                            props.launch.success === null
                            ? 'Unconfirmed'
                            : props.launch.success
                                ? 'Success'
                                : 'Failure'}</p>
                    </span>
                </div>
                <NavLink to={`/launches/${props.launch.id}`}>
                    <h3 className='card-title'>{props.launch.name}</h3>
                </NavLink>
                <h6 className='card-date'>{props.launch.date_utc}</h6>
                {
                    props.launch.links &&
                        <div className='external-links'>
                        <span>External Links:</span>
                            {props.launch.links.google_maps && <a href={props.launch.links.google_maps} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fas','map-marker-alt' ]} /></a>}
                            {props.launch.links.article && <a href={props.launch.links.article} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fas', 'newspaper']} /></a>}
                            {props.launch.links.reddit && <a href={props.launch.links.reddit} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fab', 'reddit-alien']} /></a>}
                            {props.launch.links.webcast && <a href={props.launch.links.webcast} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fab', 'youtube']} /></a>}
                            {props.launch.links.wikipedia && <a href={props.launch.links.wikipedia} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={['fab', 'wikipedia-w']} /></a>}
                        </div>
                }
                {props.launch.details &&
                    <span className='card-details'>{props.launch.details}</span>
                }
                {!(props.launch.success === null) &&
                    <div className='view-launch-button-container'>
                        <Button type='secondary' to={`/launches/${props.launch.id}`}>View Launch</Button>
                    </div>
                }
            </main>
        </article>
    )

}

export default LaunchCard