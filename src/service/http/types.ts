interface HttpResponse<T> {
  data: T
  message: string
  code: number
}

export interface AxiosHttp {
  $get<T>(url: string, params?: unknown): Promise<HttpResponse<T>>
  $post<T>(url: string, params?: unknown): Promise<HttpResponse<T>>
}
