import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import { ILogger } from '../../application/interfaces/i_logger'

export const server = express()
class HttpServer {
  constructor (private readonly logger: ILogger) {}

  public setup (): void {
   server.use(cors())
   server.use(helmet())
   server.use(compression())
   server.use(express.json())
  }

  public registerRoute (method: string, path: string, handler: any): void {
    this.logger.info(`[HttpServer::Router] Method: ${method.toUpperCase()} | Path: /api${path}`);
    (server as any)[method](path, handler)
  }

  public run (): void {
    const port = process.env.PORT || 3333
    server.listen(port, () => {
      this.logger.info(`[HttpServer::Runner] server running on port ${port}`)
    })
  }
}

export { HttpServer }
