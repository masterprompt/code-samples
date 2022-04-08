const { uniqBy, groupBy, first, get } = require('lodash')
const moment = require('moment')
const DURATIONS = require('../../constants/durations')
/*
const conflict = {
    date,
    hourId,
    durationId,
    courseIds: [ {} ]
}
*/

//  This code was the result of a 2a insomnia stretch where I had to finish this before brain allowed sleep...
//      Because of the complexity in logic, I felt this was a good candidate for some unit testing to ensure I was catching some edge cases


//  Given an array of course, determine any conflicts between them for scheduling and return a conflict array describing the conflicts
//      Courses have a date (month, day, year), hour (hour ID), duration (duration ID)
//      There is one hard-wired duration ID that means "full hour", whereas other durations are part of an hour and do not overlap each other
const mapConflicts = (courses = []) => {
    const conflicts = []
    courses = courses.map(c => ({...c, date: moment(c.date).toISOString()}))
    courses = uniqBy(courses, 'id' )
    const dateMap = groupBy(courses, 'date')
    const dateGroups = Object.values(dateMap).filter(dateGroup => dateGroup.length > 1)
    //console.log('dateGroups:', dateMap)
    dateGroups.forEach(dateGroup => {
        const hourMap = groupBy(dateGroup, 'hourId')
        const hourGroups = Object.values(hourMap).filter(hourGroup => hourGroup.length > 1)
        //console.log('hourGroups:', hourGroups)
        hourGroups.forEach(hourGroup => {
            if (hourGroup.some(course => course.durationId === DURATIONS.FULL)) {
                //console.log('some have full')
                //  Whole group is issue if there is one full duration
                const conflict = { courseIds: []}
                hourGroup.forEach(course => {
                    conflict.date = course.date
                    conflict.hourId = course.hourId
                    //conflict.durationId = course.durationId
                    conflict.courseIds.push(course.id)
                })
                conflicts.push(conflict)
            } else {
                //  Find matching durations
                const durationGroups = groupBy(hourGroup, 'durationId')
                Object.values(durationGroups)
                .filter(durationGroup => durationGroup.length > 1)
                .forEach(durationGroup => {
                    const conflict = { courseIds: []}
                    durationGroup.forEach(course => {
                        conflict.date = course.date
                        conflict.hourId = course.hourId
                        //conflict.durationId = course.durationId
                        conflict.courseIds.push(course.id)
                    })
                    conflicts.push(conflict)
                })
            }
            
        })
    })
    
    //console.log('conflicts:', conflicts)
    return conflicts
}

module.exports = mapConflicts
