import hooks from '../../../hooks'

const useCaseTasksDeclinability = () => {
    const { caseId } = hooks.useCaseId()
    const { tasks, isLoading } = hooks.useTasks({ caseId })
    const hasFieldTasks = !isLoading && tasks && tasks.some(t => t.title === 'Field' && t.statusCode !== 'Completed' && t.statusCode !== 'Waived') 
    return {
        isLoadingTasks: isLoading,
        hasFieldTasks
    }
}

export default useCaseTasksDeclinability
