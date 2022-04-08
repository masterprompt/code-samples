import React from 'react'
import useDeclineUserFlow from './use-decline-user-flow'
import useDeclineService from './use-decline-service'
import useDeclineOptions from './use-decline-options'
import useDeclinability from './use-declinability'

const useDecline = () => {

    const {
        decline,
        isDeclining,
        isLoadingDeclineService
    } = useDeclineService()

    const {
        isDeclineOptionsVisible,
        setDeclineTypeCode,
        showDecline,
        hideDecline
    } = useDeclineUserFlow({ onDecline: decline })

    const { isLoadingDeclineOptions, declineOptions } = useDeclineOptions()

    const selectDeclineOption = React.useCallback((option = {}) => {
        setDeclineTypeCode(option.declineTypeCode)
    }, [setDeclineTypeCode])

    const { isDeclinable, declinabilityStatus } = useDeclinability()

    return {
        //  Statuses
        isDeclining,
        isDeclineOptionsVisible,
        //  TODO: Reinstate the following line once POs approve decline with business
        isDeclinable: isDeclinable && !isLoadingDeclineOptions && !isLoadingDeclineService,

        //  Data
        declineOptions,
        declinabilityStatus,

        //  Actions
        selectDeclineOption,
        showDecline,
        hideDecline,
    }
}

export default useDecline
