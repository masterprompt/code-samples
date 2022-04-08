import React from 'react'
import { Route } from 'react-router-dom'
import CLIENT_ENDPOINTS from '../../../constants/client-endpoints'
import CatalogScreen from '../screen'
import ExperienceScreen from '../../experience/details-screen'
import EnrollExperienceScreen from '../../experience/enroll-screen'
import DropExperienceScreen from '../../experience/drop-screen'
import PreviewScheduleScreen from '../../schedule/preview'
import ScheduleConflictsScreen from '../../schedule/conflicts'

const SurveysRoutes = () => {
  return (
    <React.Fragment>
      <Route path={CLIENT_ENDPOINTS.CATALOG} component={CatalogScreen} />
      <Route exact path={`${CLIENT_ENDPOINTS.CATALOG}${CLIENT_ENDPOINTS.EXPERIENCE}`} component={ExperienceScreen} />
      <Route exact path={`${CLIENT_ENDPOINTS.CATALOG}${CLIENT_ENDPOINTS.EXPERIENCE}${CLIENT_ENDPOINTS.PREVIEW_SCHEDULE}`} component={PreviewScheduleScreen} />
      <Route exact path={`${CLIENT_ENDPOINTS.CATALOG}${CLIENT_ENDPOINTS.EXPERIENCE}${CLIENT_ENDPOINTS.CONFLICTS}`} component={ScheduleConflictsScreen} />
      <Route exact path={`${CLIENT_ENDPOINTS.CATALOG}${CLIENT_ENDPOINTS.EXPERIENCE}${CLIENT_ENDPOINTS.CONFLICTS}${CLIENT_ENDPOINTS.EXPERIENCE}`} component={ExperienceScreen} />
      <Route exact path={`${CLIENT_ENDPOINTS.CATALOG}${CLIENT_ENDPOINTS.EXPERIENCE}${CLIENT_ENDPOINTS.DROP}`} component={DropExperienceScreen} />
      <Route exact path={`${CLIENT_ENDPOINTS.CATALOG}${CLIENT_ENDPOINTS.EXPERIENCE}${CLIENT_ENDPOINTS.ENROLL}`} component={EnrollExperienceScreen} />
    </React.Fragment>
  )
}

export default SurveysRoutes