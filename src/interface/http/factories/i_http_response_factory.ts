import { HttpResponse } from '../../../infra/http_server/http'

type Params = {body?: any, headers?: any}
interface IHttpResponseFactory {
  ok: (params?: Params) => HttpResponse
  created: (params?: Params) => HttpResponse
  noContent: (params?: Params) => HttpResponse
  badRequest: (params?: Params) => HttpResponse
  unauthorized: (params?: Params) => HttpResponse
  forbidden: (params?: Params) => HttpResponse
  notFound: (params?: Params) => HttpResponse
  conflict: (params?: Params) => HttpResponse
  unsupportedMediaType: (params?: Params) => HttpResponse
  internalServerError: (params?: Params) => HttpResponse
}

export { IHttpResponseFactory, Params }
