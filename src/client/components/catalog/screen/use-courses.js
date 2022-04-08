import { useQuery } from 'react-query'
import hooks from '../../hooks'
import moment from 'moment'

const useCourses = ({
    filters: inputFilters = {},
    offset = 0,
    limit = 50,
} = {}) => {
    const cacheKeys = hooks.useCacheKeys()
    const { api, endpoints, url } = hooks.useApi()
    const dateFormatter = date => date ? moment(date).format('MM/DD/YYYY') : undefined
    const filters = {
        limit,
        offset,
        n: inputFilters.name,
        sd: dateFormatter(inputFilters.startDate),
        ed: dateFormatter(inputFilters.endDate),
        f: inputFilters.facilitator,
        d: inputFilters.dimensions,
        l: inputFilters.locations,
        h: inputFilters.hours,
        gradeLevel: inputFilters.gradeLevel,

    }

    //  We'll set the cache key to the filters object.  If filters are ever the same as they were before, we will just pull the results
    //      from cache (internal to react-query) rather than making a new call to retrieve them
    const {
        data,
        isLoading,
        isFetching
    } = useQuery(
        [cacheKeys.COURSES, 'SEARCH', filters],
        () => api.get(url(endpoints.courses, {}, filters))
    )
    return {
        isBusy: isLoading || isFetching,
        courses: data ? data.items : [],
        total: data ? data.total : 0,
    }
}

export default useCourses