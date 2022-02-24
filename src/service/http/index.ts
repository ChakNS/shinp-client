import axios from 'axios'
import { AxiosHttp } from './types'
import initDefaults from './defaults'
import initInterceptors from './interceptors'

initDefaults(axios)
initInterceptors(axios)

const http: AxiosHttp = {
  $get(url, params) {
    return axios.get(url, { params }).then((res) => res.data)
  },
  $post(url, params) {
    return axios.post(url, { params }).then((res) => res.data)
  },
}

export default http
