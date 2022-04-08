import { useState, useEffect } from 'react'
import useDebounce from '../use-debounce'

const useExperiencesFilters = ({
    initialDimensions = [],
    initialStartDate = new Date(),
    initialSearchString = '',
    initialHours = [],
} = {}) => {
    const [ dimensions, setDimensions ] = useState(initialDimensions)
    const [ hours, setHours ] = useState(initialHours)
    const [ startDate, setStartDate ] = useState(initialStartDate)
    const [ endDate, setEndDate ] = useState()
    const [ searchString, setSearchString ] = useState(initialSearchString)
    const debouncedSearch = useDebounce(searchString)
    const [ filters, setFilters ] = useState({
        dimensions: initialDimensions,
        hours: initialHours,
        startDate: initialStartDate,
        name: initialSearchString,
    })

    //  Update the filters any time an individual filter changes
    useEffect(() => {
        setFilters({
            hours,
            dimensions,
            startDate,
            name: debouncedSearch,
            search: debouncedSearch,
            endDate,
        })
    }, [hours, dimensions, startDate, debouncedSearch, endDate])

    return {
        dimensions,
        setDimensions,
        startDate,
        setStartDate,
        searchString,
        setSearchString,
        filters,
        setFilters,
        hours,
        setHours,
        endDate,
        setEndDate,
    }
}

export default useExperiencesFilters