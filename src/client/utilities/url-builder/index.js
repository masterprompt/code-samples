
/*
    Usage:
        const url = 'http://some.url/:foo/:hello'
        const mutatedUrl = urlBuilder(url, { foo: 'bar', hello: 'world' }, { offset: 0, limit: 25, search: null })
        >> http://some.url/bar/world?offset=0&limit=25
*/

/**
 * Function takes an endpoint string and uses key-value pairs to replace substring with requested value
 * 
 * @param {string} endpoint          - Endpoint to replace necessary substrings 
 * @param {object} urlParamConfig    - Key-value pairs of arguments to replace. Searches endpoint string for key substring and replaces it with value
 * @param {object} queryParamConfig  - Key-value pairs of arguments to add to query string.
 */
const urlBuilder = (url, urlParamConfig = {}, queryParamConfig = {}) => {
    let mutatedUrl = url

    //  Do all the url param replacements
    const urlKeys = Object.keys(urlParamConfig)
    urlKeys.forEach(urlKey => {
        mutatedUrl = mutatedUrl.replace(`:${urlKey}`, urlParamConfig[urlKey])
    })

    //  Build a list of query params
    const queryParams = []
    const queryKeys = Object.keys(queryParamConfig)
    queryKeys.forEach(queryKey => {
        const queryValue = queryParamConfig[queryKey]

        //  Query params without values should be ignored
        if (queryValue !== null && queryValue !== undefined && queryValue !== '') {
            if (Array.isArray(queryValue)) {
                //  If array, then push each value per the spec
                queryValue.forEach(qv => {
                    queryParams.push(`${queryKey}=${qv}`)    
                })
            } else {
                //  Push single value in
                queryParams.push(`${queryKey}=${queryValue}`)
            }
        }
    })

    //  Combine the query params and join to the end
    if (queryParams.length) {
        mutatedUrl = `${mutatedUrl}?${queryParams.join('&')}`
    }

    return mutatedUrl
}

export default urlBuilder
