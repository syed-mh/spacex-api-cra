import React, { useState, useEffect } from 'react';

// IMPORT COMPONENTS
import Banner           from '../components/Banner'
import BreakthroughCard from '../components/BreakthroughCard'
import Button           from '../components/Button'
import Countdown        from '../components/Countdown'
import LaunchCard       from '../components/LaunchCard'
import LaunchLineChart  from '../components/LaunchLineChart'
import Preloader        from '../components/Preloader'
import SectionTitle     from '../components/SectionTitle'

// IMPORT API FETCH CLASS
import APIFetchEvents from '../js/APIFetchEvents';

const Home = () => {

    // STATES POPULATED BY FETCH REQUESTS
    const [ nextLaunch, setNextLaunch ]       = useState({})
    const [ pastLaunches, setPastLaunches ]   = useState([])
    const [ launchpads, setLaunchpads ]       = useState([])
    const [ breakthroughs, setBreakthroughs ] = useState([])

    // STATES POPULATED BY PROCESSING FETCHED DATA
    const [ analytics, setAnalytics  ]         = useState([])
    const [ processed, setProcessed  ]         = useState(false)
    const [ preloader, setPreloader  ]         = useState(true)

    const APIFetch = new APIFetchEvents([
        {endpoint: 'launches/next', setter: setNextLaunch},
        {endpoint: 'launches/past', setter: setPastLaunches, reverse: true},
        {endpoint: 'history', setter: setBreakthroughs},
        {endpoint: 'launchpads', setter: setLaunchpads}
    ])

    useEffect(() => {

        APIFetch.get()
        document.title = 'Home | SpaceX Data Aggregation by Syed MH'

    }, [])

    useEffect(() => {
        if(!processed) {

            console.log(pastLaunches)
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

                    !analyticsData.years.includes(year) && analyticsData.years.unshift(year)

                    if(!analyticsData.successfulLaunchesByYear[year]) analyticsData.successfulLaunchesByYear[year] = 0
                    if(!analyticsData.failedLaunchesByYear[year]) analyticsData.failedLaunchesByYear[year] = 0

                    if(launch.success) {
                        analyticsData.successfulLaunchesByYear[year]++
                        analyticsData.successes++
                    } else {
                        analyticsData.failedLaunchesByYear[year]++
                        analyticsData.failures++
                    }
                })

                setAnalytics(analyticsData)

                if(launchpads.length) {
                    const newPastLaunches = [...pastLaunches.slice(0,3)]
                    newPastLaunches.forEach(launch => {
                        for(const launchpad of launchpads) {
                            if(launch.launchpad === launchpad.id) {
                                launch.links.google_maps = `https://www.google.com/maps/search/?api=1&query=${launchpad.full_name.toLowerCase().split(' ').join('+')}`
                                break
                            }
                        }
                    })

                    setProcessed(true)
                    setPastLaunches(newPastLaunches)
                }

            }

        }

    }, [pastLaunches, launchpads])

    useEffect(() => processed && setPreloader(false), [processed])

    if(preloader) {

        return <Preloader />

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
                    <SectionTitle>Launch History</SectionTitle>
                    <div className='content-container narrow'>
                        <LaunchLineChart data={analytics} />
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