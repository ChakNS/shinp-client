interface TestParams {
  keyword: string
}

export interface TestApi {
  test: (params: TestParams) => Promise<any>
}
