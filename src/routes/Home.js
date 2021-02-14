import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner'
import Countdown from '../components/Countdown'
import Preloader from '../components/Preloader'
import Button from '../components/Button'
import LaunchCard from '../components/LaunchCard'
import BreakthroughCard from '../components/BreakthroughCard'

const Home = () => {

    const [nextLaunch, setNextLaunch]       = useState(null)
    const [pastLaunches, setPastLaunches]   = useState(null)
    const [analytics, setAnalytics]         = useState(null)
    const [breakthroughs, setBreakthoughs]  = useState(null)
    const [preLoader, setPreloader]         = useState(true)

    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/launches/next')
            .then(response => response.json())
            .then(data => {
                setNextLaunch(data)
            })
    }, [])

    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/history')
        .then(response => response.json())
        .then(data => setBreakthoughs(data.reverse()))
    }, [])

    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/launches/past')
        .then(response => response.json())
        .then(data => {

            let analyticsData = {
                successes: 0, 
                failures: 0,
                years: [],
                successfulLaunchesByYear: {},
                failedLaunchesByYear: {}
            }

            data.forEach(launch => {
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
            
            setAnalytics(analyticsData)
            setPastLaunches([...data.slice(-3).reverse()])
        })
    }, [])

    useEffect(() => {
        pastLaunches    &&
        nextLaunch      &&
        analytics       &&
        breakthroughs   &&
                            setPreloader(false)
    }, [pastLaunches, nextLaunch, analytics, breakthroughs])

    if(preLoader) {
        
        return (
            <Preloader />
        )

    } else {

        return(
            <>
                <Banner title='Next Launch' subtitle={nextLaunch.name} additionalInformation={new Date(nextLaunch.date_utc).toLocaleDateString('en', {day: 'numeric', month: 'short', year: 'numeric'})}>
                    <Countdown date={nextLaunch.date_utc} />
                </Banner>
                <section className='home-about page-section'>
                    <h2 className='section-title'>About the Project</h2>
                    <p className='section-description'>While this project is in no way, shape or form afilliated with Space X, it derives all of its data from the official Space X API. The purpose of this project is to showcase my skills as a developer, and to also show people some fun information about what Space X gets up to. Click the button below to learn more about the project, and explore this Single Page Application to see more from Space X!</p>
                    <Button>Learn More</Button>
                </section>
                <section className='past-launches page-section'>
                    <h2 className='section-title'>Recent Launches</h2>
                    <div className='launch-cards-container'>
                        {pastLaunches.map(launch => {
                            console.log(launch)
                            return (
                                <LaunchCard cardDetails={launch} key={launch.flightNumber} />
                            )
                        })}
                    </div>
                    <Button>View All</Button>
                </section>
                <section className='stats page-section'>
                        <h2 className='section-title'>About SpaceX</h2>
                </section>
                <section className='breakthroughs page-section'>
                    <h2 className='section-title'>Latest Breakthroughs</h2>
                    {breakthroughs.map((breakthrough, index) => {
                        return index < 6 && <BreakthroughCard cardDetails={breakthrough} number={breakthroughs.length - index} key={breakthrough.id} />
                    })}
                </section>
            </>
        )

    }

}

export default Home;