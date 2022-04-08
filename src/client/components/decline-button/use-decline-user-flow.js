import React from 'react'
import hooks from '../../../hooks'

/*
    This hook controls the user flow (modals and such).
    1. Show decline choices
    2. Show confirmation.
    3. Show OK dialog.
    4. Show decline outcome
*/

const useDeclineUserFlow = ({
    onDecline = () => {},
}) => {
    const [isDeclineOptionsVisible, setDeclineOptionsVisible] = React.useState(false)
    const [declineTypeCode, updateDeclineTypeCode] = React.useState()

    //  We create a memoized function to pass to the message dialog so it can be updated as the decline code updates
    const doDecline = React.useCallback(() => {
        onDecline(declineTypeCode)
    }, [declineTypeCode, onDecline ])

    const { showMessageDialog } = hooks.useMessageDialog({
        title: 'Ready to decline!',
        description: 'Waive/close any outstanding requirements/field tasks if necessary',
        confirmLabel: 'OK',
        onConfirm: doDecline
    })

    //  Once confirmation is shown, we need to show the OK dialog, this does that work
    const { showConfirmation } = hooks.useConfirmationDialog({
        title: 'Are you sure?',
        description: 'Process decline (and delete current actions and/or delivery requirements)?',
        onConfirm: showMessageDialog,
        onCancel: () => setDeclineOptionsVisible(true)
    })

    //  This will set the desired decline code and show the confirmation
    const setDeclineTypeCode = React.useCallback((declineTypeCode) => {
        //console.log('setDeclineTypeCode:', declineTypeCode)
        updateDeclineTypeCode(declineTypeCode)
        setDeclineOptionsVisible(false)
        showConfirmation()
    }, [])

    const showDecline = React.useCallback(() => {
        setDeclineOptionsVisible(true)
    }, [])

    return {
        isDeclineOptionsVisible,
        setDeclineTypeCode,
        showDecline,
        hideDecline: () => setDeclineOptionsVisible(false)
    }
}

export default useDeclineUserFlow
