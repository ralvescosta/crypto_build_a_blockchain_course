import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import { ILogger } from '../../application/interfaces/i_logger'

class HttpServer {
  private readonly _server: Application
  constructor (private readonly logger: ILogger) {
    this._server = express()
  }

  public setup (): void {
   this._server.use(cors())
   this._server.use(helmet())
   this._server.use(compression())
   this._server.use(express.json())
  }

  public registerRoute (method: string, path: string, handler: any): void {
    this.logger.info(`[HttpServer::Router] Method: ${method.toUpperCase()} | Path: ${path}`);
    (this._server as any)[method](path, handler)
  }

  public run (): void {
    const port = process.env.HTTP_PORT || 3333
    this._server.listen(port, () => {
      this.logger.info(`[HttpServer::Runner] server running on port ${port}`)
    })
  }
}

export { HttpServer }
