import WsClient, { Server, WebSocket } from 'ws'
import { IP2PService } from '../../application/interfaces/i_p2p_service'
import { ILogger } from '../../application/interfaces/i_logger'

class WsServer {
  private readonly WS_PORT: number
  private readonly NODES_ADDRESS: string[]
  private _wsServer!: Server
  constructor (
    private readonly logger: ILogger,
    private readonly p2pService: IP2PService
  ) {
    this.WS_PORT = Number(process.env.WS_PORT || 5001)
    this.NODES_ADDRESS = process.env.WS_NODES_ADDRESS ? process.env.WS_NODES_ADDRESS.split(',') : []
  }

  public start (): void {
    this._wsServer = new Server({ port: this.WS_PORT })
    this.logger.info(`[WsServer::Runner] - Listening for peer-to-peer connections on: 127.0.0.1:${this.WS_PORT}`)
  }

  public registerConnectionEvent (handler: (nodeId: string) => void): void {
    this.logger.info('[WsServer::Event] Event: CONNECTION')

    this._wsServer.on('connection', connection => {
      const nodeId = this.p2pService.registerNewNode(connection)
      this.logger.info('[WsServer::_connectSocket] - socket connected')
      handler(nodeId)
    })
  }

  public registerEvent (event: string, handler: (connection: WebSocket) => void): void {
    this.logger.info(`[WsServer::Event] Event: ${event.toUpperCase()}`)
    this._wsServer.on(event, handler)
  }

  public connectToNetwork (onNodeConnectionController: any): void {
    this.NODES_ADDRESS.forEach(nodeAddress => {
      const nodeConn = new WsClient(nodeAddress)
      const nodeId = this.p2pService.registerNewNode(nodeConn)
      onNodeConnectionController.connection(nodeId)
    })
  }
}

export { WsServer }
