import hooks from '../../../hooks'
import { caseService } from '@nb/uwp-common'

const useCaseActionsDeclinability = () => {
    const { caseActions, isBusy } = hooks.useCaseActions()
    const isCaseActionsPreventingDecline = !isBusy && !caseService.isCaseActionsDeclinable({ caseActions })

    return {
        isLoadingActions: isBusy,
        isCaseActionsPreventingDecline
    }
}

export default useCaseActionsDeclinability
