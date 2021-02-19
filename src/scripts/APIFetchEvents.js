const APIFetchEvents = class {
    /**
     * @description Middleware for data fetched via the API. This class contains various methods for
     * different data processing tasks, as well as functions to process data for different pages on the
     * front-end.
     * @name APIFetchEvents
     * @constructor
     * @access public
     * @param { Array } ENDPOINTS @default {} - Array of objects containing endpoint (string) (mandatory) and return (boolean) (optional)
     */
    constructor (ENDPOINTS = {}) {
        this.endpoints = ENDPOINTS
    }
    /**
     * @description API Base URL
     * @static
     */
    static APIUrl = 'https://api.spacexdata.com/v4'
    /**
     * @description Function to sort resources by date.
     * @method
     * @function
     * @access public
     * @param { Array } RESOURCE @default [] - Unsorted array of resource objects. Default is [].
     * @param { String } SORTBY @default 'date_utc' - String representation of object attribute to sort by. Default is 'date_utc'
     * @param { String } ORDER @default 'asc' - Order to sort resources in 'asc' or 'desc'. Default is 'asc'.
     * @returns { Array } Sorted resource.
     */
    _sortResourcesByDate = (RESOURCE = [], SORTBY = 'date_utc', ORDER = 'asc') => {
        try {
            return RESOURCE.sort((current, next) => {
                // COMPARE NUMERICAL REPRESENTATION OF CURRENT AND NEXT VALUES
                const _comparison = Number(new Date(current[SORTBY])) - Number(new Date(next[SORTBY]))
                // RETURN COMPARISON OR INVERSE OF COMPARISON BASED ON ORDER
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
     * @description Function to process launches and produce Analytics data
     * @method
     * @function
     * @access private
     * @param { Array } LAUNCHES @default [] - Array of past launches 
     */
    _setAnalyticsData = (LAUNCHES = []) => {
        try {
            // INITIALIZE BAREBONES OBJECT TO POPULATE WITH ANALYTICS DATA
            const _data = {
                years: [],
                successfulLaunchesByYear: {},
                failedLaunchesByYear: {}
            }
            // LOOP THROUGH LAUNCHES TO FIND AND PLACE DATA ACCORDINGLY
            LAUNCHES.forEach(_launch => {
                // SET UP LAUNCH YEAR TO POPULATE DATA FOR FRONT-END GRAPH
                const _launchYear = new Date(_launch.date_utc).getFullYear()
                // PREPEND YEAR INTO THE ARRAY OF ALL YEARS IF IT DOESN'T EXIST IN THE ARRAY
                if(!_data.years.includes(_launchYear)) _data.years.unshift(_launchYear)
                // INITIALIZE YEARLY SUCCESSES BY ZERO IF THE YEAR DOES NOT ALREADY EXIST
                if(!_data.successfulLaunchesByYear[_launchYear]) _data.successfulLaunchesByYear[_launchYear] = 0
                // INITIALIZE YEARLY FAILURES BY ZERO IF THE YEAR DOES NOT ALREADY EXIST
                if(!_data.failedLaunchesByYear[_launchYear]) _data.failedLaunchesByYear[_launchYear] = 0
                // INCREMENT YEARLY SUCCESSES/FAILURES AND TOTAL SUCCESSES/FAILURES BASED ON LAUNCH DATA
                if(_launch.success) {
                    _data.successfulLaunchesByYear[_launchYear]++
                } else if(_launch.success) {
                    _data.successfulLaunchesByYear[_launchYear]++
                }
            })
            return _data
        } catch(error) {
            throw new Error(error)
        }
    }
    /**
     * @description Append a google maps link to each launch by identifying the launchpad
     * @method
     * @function
     * @access private
     * @param { Array } LAUNCHES @default [] - Original array of launches.
     * @param { Array } LAUNCHPADS @default [] - Original array of launchpads
     * @returns { Array } Array of launches with Launchpad Google Maps QueryString appended
     */
    _setLaunchpadPerLaunch = (LAUNCHES = [], LAUNCHPADS = []) => {
        try {
            const _launches = [...LAUNCHES]
            _launches.forEach(launch => {
                for (const launchpad of LAUNCHPADS) {
                    if(launch.launchpad === launchpad.id) {
                        launch.links.google_maps = `https://www.google.com/maps/search/?api=1&query=${launchpad.full_name.toLowerCase().split(' ').join('+')}`
                        break
                    }
                }
            })
            return _launches
        } catch(error) {
            throw new Error(error)
        }
    }
    /**
     * @description Function to process data for setting the state of the home page.
     * @method
     * @function
     * @access private
     * @returns { Object } Processed object containing all data.
     */
     _processHomePageData = async () => {
        try {
            let _rawData = await this.get([
                 {endpoint: 'launches/next'},
                 {endpoint: 'launches/past',reverse: true},
                 {endpoint: 'history', reverse: true},
                 {endpoint: 'launchpads'}])
             return {
                 nextLaunch: _rawData[0],
                 analytics: this._setAnalyticsData(_rawData[1]),
                 pastLaunches: this._setLaunchpadPerLaunch(this._sortResourcesByDate(_rawData[1], 'date_utc').slice(0, 3), _rawData[3]),
                 breakthroughs: this._sortResourcesByDate(_rawData[2], 'event_date_utc').slice(0, 4)
            }
        } catch(error) {
            throw new Error(error)
        }
     }
     /**
     * @description Function to process data for setting the state of the launches page.
     * @method
     * @function
     * @access private
     * @returns { Object } Processed object containing all data.
     */
     _processLaunchesData = async () => {
        try {
            let _rawData = await this.get([
                {endpoint: 'launches', reverse: true},
                {endpoint: 'launchpads'}])
             return {
                 launches: this._setLaunchpadPerLaunch(this._sortResourcesByDate(_rawData[0], 'date_utc'), _rawData[1]),
            }
        } catch(error) {
            throw new Error(error)
        }
     }
     _processLaunch = () => {

     }
     _processLaunchpads = () => {

     }
     /**
     * @description Initiate fetch requests with a method of "GET" based on provided [{ENDPOINTS}].
     * @method
     * @function
     * @access public
     * @param { Array } ENDPOINTS @default [] - an array of objects with endpoints {string} (mandatory) and reverse {boolean} (optional).
     * @returns { Promise } Promise containing all the data fetched from the API.
     */
    get = async (ENDPOINTS = []) => {
        try {
            if(Array.isArray(ENDPOINTS) && ENDPOINTS.length) {
                // INITIALIZE EMPTY ARRAY FOR RESULTS OF ALL FETCH REQUESTS
                const _responses = []
                // LOOP OVER ENDPOINTS TO MAKE FETCH REQUESTS
                for(let _index = 0; _index < ENDPOINTS.length; _index++) {
                    // MAKE THE FETCH REQUEST
                    let _response = await fetch(`${APIFetchEvents.APIUrl}/${ENDPOINTS[_index]['endpoint']}`)
                    // CONVERT THE RESPONSE TO JSON
                    _response = await _response.json()
                    // REVERSE THE DATA RECEIVED IF THE INPUT REQUESTS IT
                    _response = ENDPOINTS[_index].reverse ? _response.reverse() : _response
                    // PUSH RESPONSE TO 
                    _responses.push(_response)
                }
                // RETURN REQUEST RESULTS
                return _responses
            } else {
                throw new Error('No/invalid endpoints specified to APIFetchEvents.get')
            }
        } catch(error) {
            throw new Error(error)
        }
    }
    /**
     * @description Fetch , process and output data for Home Page based on pre-defined functions in the class.
     * @method
     * @function
     * @access public
     * @param { String } RESOURCE @default '' - String representation of one of the pre-determined views. If no view is supplied.
     * @param { Function } SETTER @default null - setState function to be used by the front-end to set current component state 
     * @returns { Boolean } - Returns true if data was received, otherwise it returns false
     */
    set = async (RESOURCE = '', SETTER = null) => {
        try {
            if(SETTER) {
                let data;
                switch (RESOURCE) {
                    case 'home':
                        data = await this._processHomePageData()
                        break
                    case 'launches':
                        data = await this._processLaunchesData()
                        break
                    case 'launch':
                        data = await this._processLaunch()
                        break
                    case 'launchpads':
                        data = await this._processLaunchpads()
                        break
                    case 'launchpad':
                        data = await this._processLaunchpad()
                        break
                    default:
                        data = null
                        break
                    }
                    if(data) {
                        await SETTER(data)
                        return true
                    } else {
                        return false
                    }
                } else {
                    throw new Error('Setter not defined in APIFetchEvents.set')
                }
        } catch(error) {
            throw new Error(error)
        }
    }
}

export default APIFetchEvents