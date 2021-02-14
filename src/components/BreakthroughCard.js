import React from 'react'
import Button from './Button'

const breakthroughCard = (props) => {
    console.log(props)
    return (
        <article className='breakthrough-card'>
            <div className='card-content rounded shadow'>
                <h6 className='breakthrough-date rounded shadow'>
                    <span>#{props.number}:</span> {new Date(props.cardDetails.event_date_utc).toLocaleDateString('en', {day: 'numeric', month: 'short', year: 'numeric'})}
                </h6>
                <h3 className='breakthrough-title'>{props.cardDetails.title}</h3>
                <h5>Excerpt:</h5>
                <p className='breakthrough-summary'>{props.cardDetails.details}</p>
                <Button link={props.cardDetails.links.article}>Read More</Button>
            </div>
            <div className='card-number'>
                <span></span>
            </div>
        </article>
    )
}

export default breakthroughCard