import useCaseTasksDeclinability from './use-case-tasks-declinability'
import availableDeclineOptions from './decline-options'

const useDeclineOptions = () => {
    const { isLoadingTasks, hasFieldTasks } = useCaseTasksDeclinability()

    const declineOptions = []
    if (!isLoadingTasks) {
        declineOptions.push(availableDeclineOptions.INSURANCE_NOT_WANTED)
        if (hasFieldTasks) {
            declineOptions.push(availableDeclineOptions.INFORMATION_CALLED_FOR)
        }
    }

    return {
        isLoadingDeclineOptions: isLoadingTasks,
        declineOptions
    }
}

export default useDeclineOptions
