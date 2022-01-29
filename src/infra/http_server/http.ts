export interface HttpRequest<THeader = any, TBody = any, TParams = any, TQuery = any> {
  headers: THeader
  body: TBody,
  params?: TParams,
  query?: TQuery
}

export interface HttpResponse {
  statusCode: number,
  headers?: any,
  body?: any
}
