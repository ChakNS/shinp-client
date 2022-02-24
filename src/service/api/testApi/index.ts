import http from '@/service/http'
import { TestApi } from './types'

const testApi: TestApi = {
  test: (params) => http.$post('/test', params),
}

export default testApi
