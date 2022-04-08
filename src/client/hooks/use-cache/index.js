import { useCallback } from 'react'
import { useQueryCache } from 'react-query'

const useCache = ({
    key,
    onReload = () => {}
} = {}) => {

    const cache = useQueryCache()

    const clearCache = useCallback(() => {
        cache.invalidateQueries(key)
        onReload()
    }, [cache, key, onReload])

    return {
        clearCache,
    }
}

export default useCache