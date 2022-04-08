import axiosWrapper from '../../utilities/axios-wrapper'
import urlBuilder from '../../utilities/url-builder'
import API_ENDPOINTS from '../../constants/api-endpoints'
import axios from 'axios'
import { useCallback } from 'react'
import { useQuery } from 'react-query'
import useStaleTimes from '../use-stale-times'

/*
    Simple use:
    api.get(endpoints.learningResources)

    Using parameters
    api.post(url(endpoints.learningResources, { resourceId: '123' }))

    Using Query parameters
    api.post(url(endpoints.learningResources, {}, { limit: 5 }))
*/

const useApi = () => {

    const staleTimes = useStaleTimes()

    //  Attempt to see if API is available
    const {
        isLoading,
        data: version,
    } = useQuery(
        'apiVersion',
        () => axiosWrapper.get(API_ENDPOINTS.version),
        {
            staleTime: staleTimes.MINUTE * 5,
            retry: 3,
        }
    )

    //  We can manage authorization token from here
    const setAuthorizationToken = useCallback(authorizationToken => {
        axios.defaults.headers.common['Authorization'] = authorizationToken;
    }, [])

    return {
        isLoading,
        isAvailable: Boolean(version),
        version,
        api: axiosWrapper,
        url: urlBuilder,
        endpoints: API_ENDPOINTS,
        setAuthorizationToken,
        time: staleTimes,
    }
}

export default useApi