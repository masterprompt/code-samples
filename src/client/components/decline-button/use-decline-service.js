import { useMutation } from 'react-query'
import hooks from '../../../hooks'

/*
    Calls the actual decline service!
*/

const useDeclineService = ({
    onSuccess = () => {}
} = {}) => {
    const { toastSuccess } = hooks.useToasts({ onSuccess, successMessage: 'Case was successfully declined!' })
    const { api, url, endpoints } = hooks.useApi()
    const { toastError } = hooks.useToasts({ errorMessage: 'Error declining case.', onError: onSuccess })
   
    const { caseId, isLoading, reloadApplicationData } = hooks.useApplicationData({ onReload: toastSuccess})

    const [decline, { isDeclining }] = useMutation(
        (declineTypeCode) => api.post(url(endpoints.DECLINE_CASE, { caseId }), { declineTypeCode }),
        {
            onSuccess: () => reloadApplicationData(),
            onError: () => toastError(),
        }
    )

    return {
        isLoadingDeclineService: isLoading,
        isDeclining,
        decline,
    }
}

export default useDeclineService
