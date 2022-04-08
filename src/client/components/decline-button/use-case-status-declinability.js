import hooks from '../../../hooks'
import { caseService } from '@nb/uwp-common'

const useCaseStatusDeclinability = () => {
    const { internalStatusCode, caseStatusCode, isLoading } = hooks.useApplicationData()
    const isCaseStatusPreventingDecline = !isLoading && !caseService.isCaseStatusDeclinable({ internalStatusCode, caseStatusCode })

    return {
        isLoadingCaseStatus: isLoading,
        isCaseStatusPreventingDecline
    }
}

export default useCaseStatusDeclinability
