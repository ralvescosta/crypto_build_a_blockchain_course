import { createContainer, InjectionMode, asValue, AwilixContainer, asClass } from 'awilix'
import pino from 'pino'
// @ts-ignore
import pinoInspector from 'pino-inspector'

import { HttpServer } from './infra/http_server/http_server'
import { WsServer } from './infra/websocket/ws_server'
import { InMemoryDatabaseConn } from './infra/database/in_memory/conn'
import { InMemoryBlockchainRepository } from './infra/repositories/in_memory_blockchain_repository'

import { P2PService } from './infra/p2p_service/p2p_service'
import { HttpResponseFactory } from './interface/http/factories/http_response_factory'
import { HttpErrorHandlerFactory } from './interface/http/factories/http_error_handler_factory'
import { Routes } from './interface/http/presenters/routes'
import { Events } from './interface/websocket/presenters/events'

import { GetBlocksUseCase } from './application/usecases/get_blocks_usecase'
import { SyncBlockchainUseCase } from './application/usecases/sync_blockchain_usecase'
import { MineUseCase } from './application/usecases/mine_usecase'
import { BlockchainController } from './interface/http/controllers/blockchain_controller'

import { OnNodeConnectionUseCase } from './application/usecases/on_node_connection_usecase'
import { OnNodeConnectionController } from './interface/websocket/controllers/on_node_connection_controller'

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
})
export const registerInjections = (): AwilixContainer => {
  container.register({
    logger: asValue(createLoggerInstance()),
    httpServer: asClass(HttpServer).singleton(),
    wsServer: asClass(WsServer).singleton(),
    httpResponseFactory: asClass(HttpResponseFactory).singleton(),
    httpErrorHandlerFactory: asClass(HttpErrorHandlerFactory).singleton(),

    dbConn: asClass(InMemoryDatabaseConn).singleton(),
    blockchainRepository: asClass(InMemoryBlockchainRepository).scoped(),
    p2pService: asClass(P2PService).singleton(),

    getBlocksUseCase: asClass(GetBlocksUseCase).scoped(),
    syncBlockchainUseCase: asClass(SyncBlockchainUseCase).scoped(),
    mineUseCase: asClass(MineUseCase).scoped(),
    blockchainController: asClass(BlockchainController).singleton(),
    HttpRoutes: asClass(Routes).singleton(),

    onNodeConnectionUseCase: asClass(OnNodeConnectionUseCase).scoped(),
    onNodeConnectionController: asClass(OnNodeConnectionController).singleton(),
    wsEvents: asClass(Events).singleton()
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
