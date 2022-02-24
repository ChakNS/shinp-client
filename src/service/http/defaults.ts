import { Axios } from 'axios'

const initDefaults = (axios: Axios) => {
  axios.defaults.baseURL = ''
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
}

export default initDefaults
