/**
 * Class to stand-in middleware to manage API fetch and data processing events
 * @typedef { Object } APIFetchEvents
 * @constructor
 * @param { Array<String> | null} [ENDPOINTS] - Array of strings that correspond to API endpoints
 */
const APIFetchEvents = class {

    constructor (ENDPOINTS = null) {
        this.endpoints = ENDPOINTS
    }
    /**
    * @API Base URL
    * @static
    * @type { String }
    */
    static APIUrl = 'https://api.spacexdata.com/v4'
    /**
     * Sorts any provided array of resources by date
     * @private
     * @param { Array<Object> } RESOURCE - Resource to process
     * @param { String } [SORTBY] - Define a key in each resource object to use as the reference for sorting data
     * @param { String } [ORDER] - Define order direction
     * @returns { Array<Object> } - Sorted resources
     */
    _sortResourcesByDate = (RESOURCE = [], SORTBY = 'date_utc', ORDER = 'asc') => {
        try {
            return RESOURCE.sort((_current, _next) => {
                const _comparison = Number(new Date(_current[SORTBY])) - Number(new Date(_next[SORTBY]))
                if(ORDER === 'asc') {
                    return -_comparison
                } else {
                    return _comparison
                }
            })
        } catch(error) {
            throw new Error(error)
        }
    }
    /**
     * Loop through launches to produce Analytics data for the home page
     * @private
     * @param { Array<Object> } LAUNCHES 
     * @returns {{years: Array<Number>, successfulLaunchesByYear: {year: number}, failedLaunchesByYear: {year: number} }}
     */
    _setAnalyticsData = (LAUNCHES = []) => {
        try {
            /** @type { Object } */
            const _data = {
                years: [],
                successfulLaunchesByYear: {},
                failedLaunchesByYear: {}
            }
            LAUNCHES.forEach(_launch => {
                const _launchYear = new Date(_launch.date_utc).getFullYear()
                if(!_data.years.includes(_launchYear)) _data.years.unshift(_launchYear)
                if(!_data.successfulLaunchesByYear[_launchYear]) _data.successfulLaunchesByYear[_launchYear] = 0
                if(!_data.failedLaunchesByYear[_launchYear]) _data.failedLaunchesByYear[_launchYear] = 0
                if(_launch.success) {
                    _data.successfulLaunchesByYear[_launchYear]++
                } else if(_launch.success === false) {
                    _data.failedLaunchesByYear[_launchYear]++
                }
            })
            return _data
        } catch(error) {
            throw new Error(error)
        }
    }
    /**
     * Replaced Launchpad ID with corresponding Launchpad Object on any given array of launches
     * @private
     * @param { Array<Object> } LAUNCHES - Launches to process
     * @param { Array<Object> } LAUNCHPADS - Array of all launchpads
     * @returns { Array<Object> } - Launches containing launchpad objects
     */
    _setLaunchpadPerLaunch = (LAUNCHES = [], LAUNCHPADS = []) => {
        try {
            LAUNCHES.forEach(launch => {
                for (const launchpad of LAUNCHPADS) {
                    if(launch.launchpad === launchpad.id) {
                        launch.links.google_maps = `https://www.google.com/maps/search/?api=1&query=${launchpad.full_name.toLowerCase().split(' ').join('+')}`
                        break
                    }
                }
            })
            return LAUNCHES
        } catch(error) {
            throw new Error(error)
        }
    }
    /**
     * Removes properties from Launch Object that are not needed to display a launch card
     * @private
     * @param { Object } LAUNCH - Launch Object to process
     * @returns { Object } - Processed launch Object
     */
    _processLaunchCard = (LAUNCH = {}) => {
        try {
            const { id, name, links, success, date_utc, details, launchpad } = LAUNCH
            const _launch = {}   
            /** @type { Number } */
            _launch.id = id
            /** @type { String } */
            _launch.name = name
            /** @type { String } */
            _launch.details = details
            /** @type { String } */
            _launch.date_utc = new Date(date_utc).toLocaleDateString('en', {day: 'numeric', month: 'short', year: 'numeric', hour:'numeric', minute: 'numeric', second: 'numeric'})
            /** @type { Boolean | Null } */
            _launch.success = success
            /** @type { String } */
            _launch.launchpad = launchpad
            /** @type { Object | Null } */
            _launch.links = {}
    
            if(links.article) _launch.links.article = links.article
            for(const redditLink in links.reddit) {
                if(links.reddit[redditLink]) {
                    _launch.links.reddit = links.reddit[redditLink]
                    break
                }
            }
            if(links.webcast) _launch.links.webcast = links.webcast
            if(links.wikipedia) _launch.links.wikipedia = links.wikipedia
            if(links.flickr.original.length) _launch.featuredImage = links.flickr.original[0]
            _launch.patch = links.patch.large
            if(!Object.keys(_launch.links)) _launch.links = null
            
            return _launch
        } catch(error) {
            throw new Error(error)
        }

    }
    /**
     * Replace launch IDs in launchpad object with corresponding launch Objects
     * @private
     * @param { Array<Object> } LAUNCHPADS - Array of Launchpads
     * @param { Array<Object> } LAUNCHES - All launches
     */
    _setLaunchesPerLaunchpad = (LAUNCHPADS = [], LAUNCHES = []) => {
        try {
            return LAUNCHPADS.map(launchpad => {
                LAUNCHES.forEach(launch => {
                    if(launchpad.launches.indexOf(launch.id) >= 0) {
                        launchpad.launches[launchpad.launches.indexOf(launch.id)] = launch
                    }
                })
                launchpad.launches = this._sortResourcesByDate(launchpad.launches, 'date_utc', 'asc')
                return launchpad
            })
        } catch(error) {
            throw new Error(error)
        }
    }
    /**
     * Process all data for producing a state for the home page component tree
     * @private
     * @returns {{ nextLaunch: Object, analytics: Object, pastLaunches: Array<Object>, breakthroughs: Object }} - processed state data
     */
    _processHomePageData = async () => {
        try {
            /**@type { Array<Object> } */
            const _rawData = await this.get(['launches/next', 'launches/past', 'history', 'launchpads'])
            let _pastLaunches = _rawData[1].map(launch => {
                return this._processLaunchCard(launch)
            })
            _pastLaunches = this._sortResourcesByDate(_pastLaunches)
            _pastLaunches = this._setLaunchpadPerLaunch(_pastLaunches, _rawData[3]).slice(0, 3)
            return {
                nextLaunch: _rawData[0],
                analytics: this._setAnalyticsData(_rawData[1]),
                pastLaunches: _pastLaunches,
                breakthroughs: this._sortResourcesByDate(_rawData[2], 'event_date_utc').slice(0, 4)
            }
        } catch(error) {
            throw new Error(error)
        }
    }
    /**
     * Process all data for producing the DATA state for the launches page component tree
     * @private
     * @returns { Array<Object> } - processed DATA state for launches page
     */
    _processLaunchesData = async () => {
        try {
            const _rawData = await this.get(['launches', 'launchpads'])
            return {
                launches: this._setLaunchpadPerLaunch(this._sortResourcesByDate(_rawData[0]), _rawData[1]),
            }
        } catch(error) {
            throw new Error(error)
        }
    }
    /**
     * Process all data for producing the state for a launch page component tree
     * @private
     * @param { String } LAUNCHID - ID of specific launch to be queried
     * @returns { Object } - processed state for launch page
     */
    _processLaunchData = async (LAUNCHID) => {
        try {
            const _rawData = await this.get([LAUNCHID, 'launchpads', 'ships', 'rockets', 'crew', 'payloads'])
            const _launch = {..._rawData[0]}
            _launch.launchpad = _rawData[1].find(launchpad => {
                return launchpad.id === _launch.launchpad
            })
            _launch.ships = _rawData[2].filter(ship => {
                return _launch.ships.includes(ship.id)
            })
            _launch.fairings.ships = _rawData[2].filter(ship => {
                return _launch.fairings.ships.includes(ship.id)
            })
            _launch.rocket = _rawData[3].find(rocket => {
                return rocket.id === _launch.rocket
            })
            _launch.crew = _rawData[4].filter(crew => {
                return _launch.crew.includes(crew.id)
            })
            _launch.payloads = _rawData[5].filter(payload => {
                return _launch.payloads.includes(payload.id)
            })
            return _launch
        } catch(error) {
            throw new Error(error)
        }
    }
    /**
     * Process all data for producing the state for the launchpads page component tree
     * @private
     * @returns { Array<Object> } - processed state for launchpads page
     */
    _processLaunchpadsData = async () => {
        try {
            let _rawData = await this.get(['launches', 'launchpads'])
            return {
                launchpads: this._setLaunchesPerLaunchpad(_rawData[1], _rawData[0])
            }
        } catch(error) {
            throw new Error(error)
        }
    }
    /**
     * Process all data for producing the state for a launchpad page component tree
     * @private
     * @returns { Object } - processed state for launchpad page
     */
    _processLaunchpadData = () => {

    }
    /**
     * Make fetch requests for one or multiple endpoints and send back results
     * @public
     * @param { Array<String> } [ENDPOINTS] - Array of strings that correspond to API endpoints
     * @returns { Array<Object> | Object } - Fetched resource response
     */
    get = async (ENDPOINTS = this.ENDPOINTS) => {
        try {
            if(!Array.isArray(ENDPOINTS) && !ENDPOINTS.length) throw new Error(`No/invalid ENDPOINTS <Object> specified to <APIFetchEvents.get> params. ENDPOINTS received: ${ENDPOINTS}`)
            /**@type { Array<Object> } */
            const _responses = []
            for(const endpoint of ENDPOINTS) {
                /** @type { Array<Object> | Object } */
                let _response = await fetch(`${APIFetchEvents.APIUrl}/${endpoint}`)
                _response = await _response.json()
                _responses.push(_response)
            }
            return _responses
        } catch(error) {
            throw new Error(error)
        }
    }
    /**
     * External interface to request one of several pre-programmed resources and assign them to appropriate states
     * @public
     * @param { String } RESOURCE - name of resource
     * @param { Function } SETTER - function to set state in the front-end
     * @returns { Void }
     */
    set = async (RESOURCE = '', SETTER = null) => {
        try {
            if(!SETTER) throw new Error(`No/invalid SETTER <Function> defined in <APIFetchEvents.set> params. SETTER received: ${SETTER}`)
            let data;
            switch (true) {
                case RESOURCE === 'home':
                    data = await this._processHomePageData()
                    break
                case RESOURCE === 'launches':
                    data = await this._processLaunchesData()
                    break
                case RESOURCE.includes('launches/'):
                    data = await this._processLaunchData(RESOURCE)
                    break
                case RESOURCE === 'launchpads':
                    data = await this._processLaunchpadsData()
                    break
                case RESOURCE === 'launchpad':
                    data = await this._processLaunchpadData()
                    break
                default:
                    data = null
                    break
            }
            await SETTER(data)
        } catch(error) {
            throw new Error(error)
        }
    }
}
export default APIFetchEvents