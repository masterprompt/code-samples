import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import SpinnerContainer from '../../common/spinner-container'
import ExperienceListItem from '../../experience/details-card'
import useCourses from './use-courses'
import RecordPagination from '../../common/pagination'
import userCurrentUser from './use-current-user'

const ExperienceRow = ({ children }) => (<Row style={{ paddingBottom: '30px'}}><Col xs={12}>{children}</Col></Row>)
const SpinnerRow = () => (<Row><Col><SpinnerContainer /></Col></Row>)

const ExperiencesList = ({
    filters = {},
    limit = 6
}) => {
    const [ offset, setOffset ] = useState(0)
    const { gradeLevel } = userCurrentUser()
    const { courses, isBusy, total } = useCourses({ 
        filters: {
            ...filters,
            gradeLevel,
        },
        limit,
        offset
    })
    useEffect(() => {
        setOffset(0)
    }, [filters])

    const renderExperience = (experience) => (
        <ExperienceRow
            key={experience.id}
        >
            <ExperienceListItem experience={experience} />
        </ExperienceRow>
    )

    return (
        <React.Fragment>
        {isBusy && <SpinnerRow />}
        {courses.map(renderExperience)}
        <Row><Col><RecordPagination offset={offset} limit={limit} total={total} setOffset={setOffset} /></Col></Row>
        </React.Fragment>
    )
}

export default ExperiencesList