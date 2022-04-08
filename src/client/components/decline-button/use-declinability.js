import useCaseActionsDeclinability from './use-case-actions-declinability'
import useCaseStatusDeclinability from './use-case-status-declinability'
import hooks from '../../../hooks'

const useDeclinability = () => {
    const { decline: declineFeature } = hooks.useQueryFeatures()
    const { isLoadingCaseStatus, isCaseStatusPreventingDecline } = useCaseStatusDeclinability()
    const { isLoadingActions, isCaseActionsPreventingDecline} = useCaseActionsDeclinability()
   
    const isLoading = isLoadingActions || isLoadingCaseStatus

    //  Get some status checks going to determine declinability
    
    // const isDeclinable = !isLoading && !isCaseActionsPreventingDecline && !isCaseStatusPreventingDecline
    //  TODO: Remove this workaround and reinstate previous line once PO approves decline enablement for production
    const isDeclinable = declineFeature && !isLoading && !isCaseActionsPreventingDecline && !isCaseStatusPreventingDecline
    
    // const declinabilityStatus = isCaseStatusPreventingDecline ? `Improper case status for decline` : isCaseActionsPreventingDecline ? 'Case has case actions preventing decline' : isLoading ? 'Checking...' : ''
    //  TODO: Remove this workaround and reinstate previous line once PO approves decline enablement for production
    const declinabilityStatus = !declineFeature ? 'Coming soon...' : isCaseStatusPreventingDecline ? `Improper case status for decline` : isCaseActionsPreventingDecline ? 'Case has case actions preventing decline' : isLoading ? 'Checking...' : ''

    return {
        declinabilityStatus,
        isDeclinable,
    }
}

export default useDeclinability
