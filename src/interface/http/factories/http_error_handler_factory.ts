import { Left } from '../../../shared/either'
import { HttpResponse } from '../../../infra/http_server/http'
import { BaseError } from '../../../shared/base_error'
import { IHttpResponseFactory } from './i_http_response_factory'

class HttpErrorHandlerFactory {
  constructor (private readonly httpResponseFactory: IHttpResponseFactory) {}

  public handler (result: Left<BaseError, any>): HttpResponse {
    return this.httpResponseFactory.internalServerError()
  }
}

export { HttpErrorHandlerFactory }
