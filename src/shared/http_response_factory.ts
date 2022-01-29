import { HttpResponse } from '../../src/infra/http_server/http'
import IHttpResponseFactory, { Params } from './i_http_response_factory'

class HttpResponseFactory implements IHttpResponseFactory {
  public ok (params: Params = {}): HttpResponse {
    return {
      statusCode: 200,
      body: params.body,
      headers: params.headers
    }
  }

  public created (params: Params = {}): HttpResponse {
    return {
      statusCode: 201,
      body: params.body,
      headers: params.headers
    }
  }

  public noContent (params: Params = {}): HttpResponse {
    return {
      statusCode: 204,
      body: params.body,
      headers: params.headers
    }
  }

  public badRequest (params: Params = {}): HttpResponse {
    return {
      statusCode: 400,
      body: params.body,
      headers: params.headers
    }
  }

  public unauthorized (params: Params = {}): HttpResponse {
    return {
      statusCode: 401,
      body: params.body,
      headers: params.headers
    }
  }

  public forbidden (params: Params = {}): HttpResponse {
    return {
      statusCode: 403,
      body: params.body,
      headers: params.headers
    }
  }

  public notFound (params: Params = {}): HttpResponse {
    return {
      statusCode: 404,
      body: params.body,
      headers: params.headers
    }
  }

  public conflict (params: Params = {}): HttpResponse {
    return {
      statusCode: 409,
      body: params.body,
      headers: params.headers
    }
  }

  public unsupportedMediaType (params: Params = {}): HttpResponse {
    return {
      statusCode: 415,
      body: params.body,
      headers: params.headers
    }
  }

  public internalServerError (params: Params = {}): HttpResponse {
    return {
      statusCode: 500,
      body: params.body,
      headers: params.headers
    }
  }
}

export { HttpResponseFactory }
