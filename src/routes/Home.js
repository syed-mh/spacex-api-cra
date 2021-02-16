import React, { useState, useEffect } from 'react';

// IMPORT COMPONENTS
import Banner from '../components/Banner'
import Countdown from '../components/Countdown'
import Preloader from '../components/Preloader'
import Button from '../components/Button'
import LaunchCard from '../components/LaunchCard'
import BreakthroughCard from '../components/BreakthroughCard'
import SectionTitle from '../components/SectionTitle'

const Home = () => {

    // STATES POPULATED BY FETCH REQUESTS
    const [nextLaunch, setNextLaunch]       = useState({})
    const [pastLaunches, setPastLaunches]   = useState([])
    const [about, setAbout]                 = useState([])
    const [launchpads, setLaunchpads]       = useState([])
    const [breakthroughs, setBreakthroughs] = useState([])

    // STATES POPULATED BY PROCESSING FETCHED DATA
    const [analytics, setAnalytics]         = useState([])
    const [processed, setProcessed]         = useState(false)
    const [preloader, setPreloader]         = useState(true)

    const _setters = {
        setNextLaunch   : setNextLaunch,
        setPastLaunches : setPastLaunches,
        setBreakthroughs: setBreakthroughs,
        setAbout        : setAbout,
        setLaunchpads   : setLaunchpads,
    }

    const APIFetchEvents = setters => {
        const _API_URL = 'https://api.spacexdata.com/v4'
        const _REQUESTS = [
            fetch(`${_API_URL}/launches/next`),
            fetch(`${_API_URL}/launches/past`),
            fetch(`${_API_URL}/company`),
            fetch(`${_API_URL}/history`),
            fetch(`${_API_URL}/launchpads`)
        ]

        Promise.all(_REQUESTS)
            .then(results => Promise.all(results.map(result => result.json())))
            .then(jsonData => {
                setters.setNextLaunch(jsonData[0])
                setters.setPastLaunches(jsonData[1].reverse())
                setters.setAbout(jsonData[2])
                setters.setBreakthroughs(jsonData[3])
                setters.setLaunchpads(jsonData[4])
            })
    }

    useEffect(() => {
        APIFetchEvents(_setters)
    }, [])

    useEffect(() => {
        if(!processed) {
        
            if(pastLaunches.length && launchpads.length) {

                const analyticsData = {
                    successes: 0,
                    failures: 0,
                    years: [],
                    successfulLaunchesByYear: {},
                    failedLaunchesByYear: {}
                }

                pastLaunches.forEach(launch => {
                    const year = new Date(launch.date_utc).getFullYear()
                    
                    !analyticsData.years.includes(year) && analyticsData.years.push(year)

                    if(launch.success) {
                        if(!analyticsData.successfulLaunchesByYear[year]) {
                            analyticsData.successfulLaunchesByYear[year] = 1
                        } else {
                            analyticsData.successfulLaunchesByYear[year]++
                        }
                        analyticsData.successes++
                    } else {
                        if(!analyticsData.failedLaunchesByYear[year]) {
                            analyticsData.failedLaunchesByYear[year] = 1
                        } else {
                            analyticsData.failedLaunchesByYear++
                        }
                        analyticsData.failures++
                    }
                })

                setAnalytics(analytics)

                if(launchpads.length) {
                    const newPastLaunches = [...pastLaunches]
                    newPastLaunches.forEach(launch => {
                        for(const launchpad of launchpads) {
                            if(launch.launchpad === launchpad.id) {
                                launch.links.google_maps = `https://www.google.com/maps/search/?api=1&query=${launchpad.full_name.toLowerCase().split(' ').join('+')}`
                                break
                            }
                        }
                    })
                    
                    setPastLaunches(newPastLaunches)
                    setProcessed(true)
                }

            }
            
        }

    }, [pastLaunches, launchpads])

    useEffect(() => processed && setPreloader(false), [processed])

    if(preloader) {
        
        return (
            <Preloader />
        )

    } else {

        return(
            <>
                <Banner title='Next Launch' subtitle={nextLaunch.name} additionalInformation={new Date(nextLaunch.date_utc).toLocaleDateString('en', {day: 'numeric', month: 'short', year: 'numeric'})}>
                    <Countdown date={nextLaunch.date_utc} />
                </Banner>
                <section className='narrow page-section'>
                    <SectionTitle>About the Project</SectionTitle>
                    <p className='section-description'>While this project is in no way, shape or form afilliated with Space X, it derives all of its data from the official Space X API. The purpose of this project is to showcase my skills as a developer, and to also show people some fun information about what Space X gets up to. Click the button below to learn more about the project, and explore this Single Page Application to see more from Space X!</p>
                    <Button to='/about'>Learn More</Button>
                </section>
                <section className='past-launches page-section'>
                    <SectionTitle>Recent Launches</SectionTitle>
                    <div className='content-container'>
                        {pastLaunches.map((launch, index) => {
                            return index < 3 && <LaunchCard cardDetails={launch} key={index} />
                        })}
                    </div>
                    <Button to='/launches'>View All</Button>
                </section>
                <section className='stats page-section'>
                    <SectionTitle>About SpaceX</SectionTitle>
                    <p className='spacex-summary narrow '>
                        {about.summary}
                    </p>
                    <article className='about-card half'>
                        <div className='card-container rounded shadow'>
                            <h4 className='title'># of Employees</h4>
                            <h2 className='value'>{about.employees}</h2>
                        </div>
                    </article>
                    <div className='content-container'>
                    </div>
                </section>
                <section className='breakthroughs page-section'>
                    <SectionTitle>Latest Breakthroughs</SectionTitle>
                    <div className='content-container'>
                        {breakthroughs.map((breakthrough, index) => {
                            return index < 4 && <BreakthroughCard cardDetails={breakthrough} number={breakthroughs.length - index} key={breakthrough.id} />
                        })}
                    </div>
                </section>
            </>
        )

    }

}

export default Home;