const declineOptions = {
    INSURANCE_NOT_WANTED: {
        //  The label is used for the UI
        label: 'Insurance Not Wanted',
        //  This code is sent to the decline service
        declineTypeCode: '4724'
    },
    INFORMATION_CALLED_FOR: {
        label: 'Information Called For',
        declineTypeCode: '4722'
    }
}

export default declineOptions
