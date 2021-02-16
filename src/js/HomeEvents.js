/**
* Sets up functions for all non-react-handled events on the home page
* @constructor
* @param {object} setters - all setters for states in Home Component
*/

const HomeEvents = class {


    constructor(setters) {
        this.setters    = {...setters}
    }
    
    getNextLaunch = () => {
        fetch('https://api.spacexdata.com/v4/launches/next')
            .then(response => response.json())
            .then(data => this.setters.setNextLaunch(data))
    }

    getLaunches = () => {
        fetch('https://api.spacexdata.com/v4/launches/past')
            .then(response => response.json())
            .then(data => {
                const analyticsData = {
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
                this.setters.setAnalytics(analyticsData)
                this.setters.setPastLaunches([...data.slice(-3).reverse()])
            })
    }

    getCompanyInfo = () => {
        fetch('https://api.spacexdata.com/v4/company')
            .then(response => response.json())
            .then(data => {
                this.setters.setAbout({
                    companyValuation  : data.valuation,
                    summary           : data.summary,
                    yearsInBusiness   : new Date().getFullYear() - data.founded,
                    links             : data.links,
                    numberOfEmployees : data.employees,
                })
            })
    }

    getHistory = () => {
        fetch('https://api.spacexdata.com/v4/history')
            .then(response => response.json())
            .then(data => this.setters.setBreakthoughs(data.reverse()))
    }

    getLaunchPads = () => {
        fetch('https://api.spacexdata.com/v4/launchpads')
            .then(response => response.json())
            .then(data => this.setters.setLaunchPads(data))
    }




}

export default HomeEvents