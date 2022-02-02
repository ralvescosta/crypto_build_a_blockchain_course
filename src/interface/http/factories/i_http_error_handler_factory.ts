import { Left } from '../../../shared/either'
import { BaseError } from '../../../shared/base_error'
import { HttpResponse } from '../../../infra/http_server/http'

interface IHttpErrorHandlerFactory {
  handler: (result: Left<BaseError, any>) => HttpResponse
}

export { IHttpErrorHandlerFactory }
