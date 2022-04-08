import React from 'react'
import { Row, Col } from 'react-bootstrap'
import SearchFilter from '../../common/search-filter'
import DimensionsFilter from '../../common/dimensions-multi-selector'
import SingleDatePicker from '../../common/single-date-picker'
import ClassHoursMultiSelector from '../../common/class-hours-multi-selector'

const FiltersRow = ({ children }) => (<Row style={{ paddingTop: '15px'}}>{children}</Row>)

const Filters = ({
    searchString,
    onSearchStringChange = () => {},
    startDate,
    onStartDateChange = () => {},
    dimensions = [],
    onDimensionsChange = () => {},
    hours,
    onHoursChange = () => {},
    endDate,
    onEndDateChange = () => {}
}) => {
    return (
        <React.Fragment>
            <FiltersRow><Col>
                <SearchFilter
                    title='What are you looking for?'
                    value={searchString}
                    onChange={onSearchStringChange}
                />
            </Col></FiltersRow>
            <FiltersRow>
                <Col xs={12} sm={6}><SingleDatePicker showIcon value={startDate} onChange={onStartDateChange} /></Col>
                <Col xs={12} sm={6}><SingleDatePicker showIcon value={endDate} onChange={onEndDateChange} label='End Date' placeholder='End Date' showClearDate/></Col>
                
            </FiltersRow>
            <FiltersRow>
                <Col xs={12} md={6}><ClassHoursMultiSelector showIcon values={hours} onChange={onHoursChange} /></Col>    
                <Col xs={12} md={6} ><DimensionsFilter showIcon values={dimensions} onChange={onDimensionsChange} /></Col>
            </FiltersRow>
        </React.Fragment>
    )
}

export default Filters