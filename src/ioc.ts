import { createContainer, InjectionMode, asValue, AwilixContainer, asClass } from 'awilix'
import pino from 'pino'
import pinoInspector from 'pino-inspector'

import { HttpResponseFactory } from './shared/http_response_factory'
import { HttpServer } from './infra/http_server/http_server'

export const container = createContainer({
  injectionMode: InjectionMode.PROXY
})
export const registerInjections = (): AwilixContainer => {
  container.register({
    logger: asValue(createLoggerInstance()),
    httpServer: asClass(HttpServer).singleton(),
    httpResponseFactory: asClass(HttpResponseFactory).singleton()
  })

  return container
}

const createLoggerInstance = (): pino.Logger => {
  let logger : pino.Logger
  const debug = process.env.DEBUG === 'true'

  if (debug) {
    logger = pino({
      enabled: process.env.ENABLE_LOG === 'true',
      level: process.env.LOG_LEVEL || 'warn',
      prettyPrint: true,
      prettifier: pinoInspector
    })
  } else {
    logger = pino({
      enabled: process.env.ENABLE_LOG === 'true',
      level: process.env.LOG_LEVEL || 'warn'
    })
  }

  return logger
}