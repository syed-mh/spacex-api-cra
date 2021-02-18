const APIFetchEvents = class {

    /**
     * @constructor
     * @param {array} requests requires an array of objects with three attributes: endpoint (mandatory), setter (mandatory) and reverse (optiona;)
     */

    constructor (requests) {
        this.requests = requests
        this.APIUrl = 'https://api.spacexdata.com/v4'
    }

    get = () => {
        
        const _requests = this.requests.map(request => fetch(`${this.APIUrl}/${request.endpoint}`))

        Promise
            .all(_requests)
            .then(results => Promise.all(results.map(result => result.json())))
            .then(results => this.requests.forEach((request, index) => request.reverse ? request.setter(results[index].reverse()) : request.setter(results[index])))
    }

}

export default APIFetchEvents