import React from 'react'
import LunaModal, { LunaModalSizes } from '@uitk/ui-toolkit-react/dist/wip/luna-modal'
import { createPortal } from 'react-dom'

const DeclineOptionsModal = ({
    onClose = () => {},
    declineOptions = [],
    onDeclineOptionSelect = () => {}
}) => {

    const renderOption = (option, index) => (
        <div key={index} onClick={() => onDeclineOptionSelect(option)} className="luna-type-body-30 selector">{option.label}</div>
    )

    return createPortal(
        <React.Fragment>
            <LunaModal
                size={LunaModalSizes.modal40}
                id='exampleModal40'
                isOpen={true}
                title="Decline"
                onClose={() => onClose()}
                onSecondaryAction={() => onClose()}
                secondaryLabel="Cancel"
                className="decline-modal"
            >
                <div className="selector-container">
                    {declineOptions.map(renderOption)}
                </div>
            </LunaModal>
        </React.Fragment>
    , document.body)
}

export default DeclineOptionsModal
