import { Request, Response } from 'express'
import { HttpRequest, HttpResponse } from '../http_server/http'
import ILogger from '../../application/interfaces/i_logger'

export default (handler: (req: HttpRequest) => Promise<HttpResponse>, logger: ILogger) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query
    }
    logger.info({
      method: req.method,
      path: req.path,
      type: 'request',
      requestBody: req.body,
      requestHeader: req.headers
    })

    const resolve = await handler(httpRequest)

    if (resolve.statusCode >= 400) {
      logger.error({
        method: req.method,
        path: req.path,
        type: 'response',
        statusCode: resolve.statusCode,
        responseBody: resolve.body,
        responseHeader: resolve.headers
      })
      return res.status(resolve.statusCode).header(resolve.headers).json({ statusCode: resolve.statusCode, message: resolve.body })
    }

    logger.info({
      method: req.method,
      path: req.path,
      type: 'response',
      statusCode: resolve.statusCode,
      responseBody: resolve.body,
      responseHeader: resolve.headers
    })
    return res.status(resolve.statusCode).header(resolve.headers).json(resolve.body)
  }
}
