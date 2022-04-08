const mapConflicts = require('./map-conflicts')
const DURATIONS = require('../../constants/durations')
const moment = require('moment')

const createCourse = (id, date, hourId, durationId) => ({
    id,
    date,
    hourId,
    durationId
})

describe('course.mapConflicts', () => {
    const dateA = moment('2021-08-16T12:12:00.000').toISOString()
    const dateB = moment('2021-08-18T12:00:00.000').toISOString()
    test('should return properly on default', () => {
        expect(mapConflicts()).toEqual([])
    })

    test('should return properly for full match', () => {
        const date = dateA, hourId = 'H1'
        const input = [
            createCourse(1, dateA, hourId, 'D1'),
            createCourse(2, dateA, hourId, 'D1'),
            createCourse(3, dateA, hourId, 'D2')
        ]
        const output = [{
            date,
            hourId,
            courseIds: [ 1, 2]
        }]
        expect(mapConflicts(input)).toEqual(output)
    })
    test('should return properly for full duration', () => {
        const date = dateA, hourId = 'H1'
        const input = [
            createCourse(1, dateA, hourId, DURATIONS.FULL),
            createCourse(2, dateA, hourId, 'D1'),
            createCourse(3, dateA, hourId, 'D2')
        ]
        const output = [{
            date,
            hourId,
            courseIds: [ 1, 2, 3]
        }]
        expect(mapConflicts(input)).toEqual(output)
    })
    test('should return properly for multiples', () => {
        const input = [
            createCourse(1, dateA, 'H1', 'D1'),
            createCourse(2, dateA, 'H1', 'D1'),
            createCourse(3, dateB, 'H1', 'D2'),
            createCourse(4, dateB, 'H1', 'D2'),
            createCourse(5, dateA, 'H2', 'D1')
        ]
        const output = [{
            date: dateA,
            hourId: 'H1',
            courseIds: [1, 2]
        }, {
            date: dateB,
            hourId: 'H1',
            courseIds: [3, 4]
        }]
        expect(mapConflicts(input)).toEqual(output)
    })
})