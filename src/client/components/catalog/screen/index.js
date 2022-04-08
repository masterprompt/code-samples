import React from 'react'
import Filters from './filters'

import { Row, Col } from 'react-bootstrap'
import useCourseFilters from './use-course-filters'

import List from './list'


const CatalogScreen = () => {

    const {
        filters,
        dimensions,
        setDimensions,
        startDate,
        setStartDate,
        searchString,
        setSearchString,
        hours,
        setHours,
        endDate,
        setEndDate,
    } = useCourseFilters()

    return (
        <div>
            <Row style={{ padding: '20px'}}>
                <Col>
                    <div className='text-center'>
                        <strong>Add Experiences</strong>
                    </div>
                    <Filters
                        searchString={searchString}
                        onSearchStringChange={setSearchString}
                        startDate={startDate}
                        onStartDateChange={setStartDate}
                        dimensions={dimensions}
                        onDimensionsChange={setDimensions}
                        hours={hours}
                        onHoursChange={setHours}
                        endDate={endDate}
                        onEndDateChange={setEndDate}
                    />
                    <Row
                        style={{ padding: '20px'}}
                    >
                        <Col className='text-center'>
                            Click on an experience for full details to learn more.
                        </Col>
                    </Row>
                    <List filters={filters} />
                </Col>
            </Row>
        </div>
    )
}

export default CatalogScreen