import WsClient, { Server, WebSocket } from 'ws'
import { ILogger } from '../../application/interfaces/i_logger'
import { IBlockchainRepository } from '../../application/interfaces/i_blockchain_repository'

class P2PServer {
  private readonly PEARS_ADDRESS: string[]
  private readonly WS_PORT: number
  private readonly _connectedNodes: WebSocket[] = []
  constructor (
    private readonly logger: ILogger,
    private readonly blockchainRepository: IBlockchainRepository
  ) {
    this.PEARS_ADDRESS = process.env.WS_PEERS_ADDRESS ? process.env.WS_PEERS_ADDRESS.split(',') : []
    this.WS_PORT = Number(process.env.WS_PORT || 5001)
  }

  public start (): void {
    const server = new Server({ port: this.WS_PORT })
    server.on('connection', connection => this._connectSocket(connection))
    this.logger.info(`[P2PServer::start] - Listening for peer-to-peer connections on: 127.0.0.1:${this.WS_PORT}`)
  }

  public connToNetwork (): void {
    if (!this.PEARS_ADDRESS.length) {
      this.logger.info('[P2PServer::coonToNetwork] - Dont have node address to connect')
      return
    }
    this.PEARS_ADDRESS.forEach(peerAddress => {
      const connection = new WsClient(peerAddress)
      this._connectSocket(connection)
    })
  }

  private _connectSocket (connection: WebSocket): void {
    this._connectedNodes.push(connection)
    this.logger.info('[SP2PServer::_connectSocket] - socket connected')
  }
}

export { P2PServer }
