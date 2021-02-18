import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const breakthroughCard = (props) => {
    return (
        <article className='breakthrough-card'>
            <div className='card-content rounded shadow'>
                <h6 className='breakthrough-date rounded shadow'>
                    <span>#{props.number}:</span> {new Date(props.cardDetails.event_date_utc).toLocaleDateString('en', {day: 'numeric', month: 'short', year: 'numeric'})}
                </h6>
                {props.cardDetails.links.article 
                ? 
                <a href={props.cardDetails.links.article} target='_blank' rel='noreferrer'>
                    <h3 className='breakthrough-title'>
                        {props.cardDetails.title}
                        <FontAwesomeIcon icon={['fas', 'external-link-alt']} />
                    </h3>
                </a>
                :
                <h3 className='breakthrough-title'>{props.cardDetails.title}</h3>
                }
                <h5>Excerpt:</h5>
                <p className='breakthrough-summary'>{props.cardDetails.details}</p>
            </div>
            <div className='card-number'>
                <span></span>
            </div>
        </article>
    )
}

export default breakthroughCard