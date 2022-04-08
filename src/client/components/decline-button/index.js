import React from 'react'
import LunaButton, { ButtonTypes, ButtonSizes } from '@uitk/ui-toolkit-react/dist/wip/luna-button'
import DeclineOptionsModal from './decline-options-modal'
import useDecline from './use-decline'
import BusyModal from '../../common/modals/busy-modal'

const DeclineButton = () => {

    const {
        //  Statuses
        isDeclining,
        isDeclineOptionsVisible,
        isDeclinable,

        //  Data
        declineOptions,
        declinabilityStatus,

        //  Actions
        selectDeclineOption,
        showDecline,
        hideDecline
    } = useDecline()

    const renderBusyModal = () => !isDeclining ? null : (<BusyModal label='Declining Case...' />)

    const renderOptionsModal = () => !isDeclineOptionsVisible ? null : (
        <DeclineOptionsModal
            onClose={hideDecline}
            declineOptions={declineOptions}
            onDeclineOptionSelect={selectDeclineOption}
        />
    )

    return (
        <React.Fragment>
            <LunaButton
                disabled={!isDeclinable}
                onClick={showDecline}
                size={ButtonSizes.full}
                type={ButtonTypes.secondary}
                other={{ title: declinabilityStatus }}
            >
                Decline
            </LunaButton>
            {renderOptionsModal()}
            {renderBusyModal()}
        </React.Fragment>
    )
}

export default DeclineButton
