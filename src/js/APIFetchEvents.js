const APIFetchEvents = class {

    _this = this

    getResource = (endpoint) => {
        return new Promise ((resolve, reject) => {
            fetch(`https://api.spacexdata.com/v4/${endpoint}`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        })
    }

}

export default APIFetchEvents