import axios from 'axios'
import { property, get } from 'lodash'

const axiosWrapper = (method, ...args) => {
  return axios[method](...args)
    .then(property('data'))
    .catch(err => {
		const status = get(err, 'response.status')
		let errMessage = get(err, 'response.data', `Undetermined error${status ? `(${status})` : ''}`)
		if (status === 400 || status === 500) {
			errMessage = `System - ${errMessage}`
		}
      	return Promise.reject(errMessage)
    })
}

const reducer = (accumulator, restMethod) => {
  return {
    ...accumulator,
    [restMethod]: (...args) => axiosWrapper(restMethod, ...args)
  }
}

export default ['get', 'post', 'put', 'patch', 'delete'].reduce(reducer, {})
