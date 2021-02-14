import React from 'react'
import imagePlaceholder from '../images/placeholder.png'
import articleLogo from '../images/article.png'
import wikipediaLogo from '../images/wikipedia.png'
import redditLogo from '../images/reddit.png'
import youtubeLogo from '../images/youtube.png'

const LaunchCard = (props) => {

    return (
        <article className='card-container' key={props.cardDetails.flight_number}>
            <main className='card rounded-large shadow'>
                <div className='card-image'>
                    {props.cardDetails.links.flickr.original ? 
                        <img className='rounded' src={props.cardDetails.links.flickr.original[0]} alt={props.cardDetails.name}/>
                        :
                        <img className='rounded' src={imagePlaceholder} alt='Photos not found'/>
                    }
                    <span className='mission-patch-container rounded shadow'>
                        <img className='mission-patch' src={props.cardDetails.links.patch.small} alt='Mission Patch' />
                    </span>
                    <span className={`mission-status ${props.cardDetails.success ? 'success' : 'failure'} rounded shadow`}>
                        <p>{props.cardDetails.success ? 'Success' : 'Failure'}</p>
                    </span>
                </div>
                <h3 className='card-title'>{props.cardDetails.name}</h3>
                <h6 className='card-date'>{new Date(props.cardDetails.date_utc).toLocaleDateString('en', {day: 'numeric', month: 'short', year: 'numeric', hour:'numeric', minute: 'numeric', second: 'numeric'})}</h6>
                <div className='external-links'>
                <span>External Links:</span>
                    {props.cardDetails.links.article && <a key={`article_${props.cardDetails.flight_number}`} href={props.cardDetails.links.article} target='_blank' rel="noreferrer noopener"><img src={articleLogo} alt='Generic Article Icon' /></a>}
                    {props.cardDetails.links.reddit && <a key={`reddit_${props.cardDetails.flight_number}`} href={props.cardDetails.links.reddit.launch} target='_blank' rel="noreferrer noopener"><img src={redditLogo} alt='Reddit Icon' /></a>}
                    {props.cardDetails.links.webcast && <a key={`webcast_${props.cardDetails.flight_number}`} href={props.cardDetails.links.webcast} target='_blank' rel="noreferrer noopener"><img src={youtubeLogo} alt='YouTube Icon' /></a>}
                    {props.cardDetails.links.wikipedia && <a key={`wiki_${props.cardDetails.flight_number}`} href={props.cardDetails.links.wikipedia} target='_blank' rel="noreferrer noopener"><img src={wikipediaLogo} alt='Wikipedia Icon' /></a>}
                </div>
                <p className='card-details'>{props.cardDetails.details}</p>
            </main>
        </article>
    )

}

export default LaunchCard