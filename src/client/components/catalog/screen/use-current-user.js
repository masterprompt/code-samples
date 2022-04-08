import React from 'react'
import useToken from '../use-token'
import { useAuth0 } from "@auth0/auth0-react"
import { useQuery } from 'react-query'
import isAdmin from '../../utilities/is-admin'
import isStudent from '../../utilities/is-student'
import isTscUser from '../../utilities/is-tsc'
import isFacilitator from '../../utilities/is-facilitator'
import { get } from 'lodash'
import getUserGradeLevel from '../../utilities/get-user-grade-level'
import useCacheKeys from '../use-cache-keys'
import useApi from '../use-api'

let canRetry = true

const useCurrentUser = () => {

    const cacheKeys = useCacheKeys()
    const { api, endpoints, isAvailable, time } = useApi()
    const [ refetchInterval, setRefetchInterval ] = React.useState()
    const { loginWithRedirect: login, logout: authLogout } = useAuth0()
    const { token, isBusy: isAuthenticationBusy } = useToken()

    //  If we have a token from auth0, and the api is available, retrieve our user data from the database
    const {
        data: currentUser,
        isLoading
    } = useQuery(
        [cacheKeys.REQUEST_USER, token],
        () => api.get(endpoints.requestUser),
        {
            enabled: Boolean(token) && isAvailable,
            staleTime: time.MINUTE,
            refetchIntervalInBackground: true,
            refetchInterval,
            retry: 2,
            onError:() => canRetry = false
        }
    )

    //  If the user exists, and they are verified, we no longer need to refetch them.  This allows us to keep the user on the
    //      "email not verified" screen, and keep refetching until we know they are validated and authorized.
    React.useEffect(() => {
        let refetchInterval = time.MINUTE
        if (currentUser) {
            const rolesCode = get(currentUser, 'rolesCode', '')
            const emailVerified = get(currentUser, 'emailVerified', false)
            if (emailVerified && rolesCode) {
                refetchInterval = false
            }
        }
        setRefetchInterval(refetchInterval)
    }, [currentUser, setRefetchInterval])

    //  wrap in the auth0 stuff so we have one stop shop!
    const logout = React.useCallback(() => authLogout({ returnTo: window.location.origin }), [authLogout])

    const id = get(currentUser, 'id')
    const rolesCode = get(currentUser, 'rolesCode', '')
    const isVerified = get(currentUser, 'emailVerified', false)
    const isTsc = isTscUser(currentUser)
    const gradeLevel = !isTsc ? getUserGradeLevel(currentUser) : undefined

    return {
        currentUser,
        id,
        isBusy: isAuthenticationBusy || isLoading,
        login,
        logout,
        isAdmin: isAdmin(currentUser),
        isFacilitator: isFacilitator(currentUser),
        isStudent: isStudent(currentUser),
        isTsc,
        canMessage: isAdmin(currentUser) || isFacilitator(currentUser),
        gradeLevel,
        isVerified,
        isAuthorized: Boolean(rolesCode),
    }
}

export default useCurrentUser
