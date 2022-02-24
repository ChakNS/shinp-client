import { Axios, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const initInterceptors = (axios: Axios) => {
  axios.interceptors.request.use(
    requestInterceptors,
    (err: AxiosError): AxiosError => err
  )
  axios.interceptors.response.use(
    responseInterceptors,
    (err: AxiosError): AxiosError => err
  )
}

const requestInterceptors = (
  config: AxiosRequestConfig<any>
): AxiosRequestConfig<any> => {
  console.log('requese interceptors')
  // do something...
  return config
}

const responseInterceptors = (
  response: AxiosResponse<any>
): AxiosResponse<any> => {
  console.log('response interceptors')
  // do something...
  return response
}

export default initInterceptors
