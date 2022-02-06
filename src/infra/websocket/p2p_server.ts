import WsClient, { Server, WebSocket } from 'ws'
import { ILogger } from '../../application/interfaces/i_logger'
import { ISyncBlockchainUseCase } from '../../domain/usecases/i_sync_blockchain_usecase'
import { IGetBlocksUseCase } from '../../domain/usecases/i_get_blocks_usecase'

class P2PServer {
  private readonly PEARS_ADDRESS: string[]
  private readonly WS_PORT: number
  private _wsServer!: Server
  private readonly _connectedNodes: WebSocket[] = []
  constructor (
    private readonly logger: ILogger,
    private readonly p2pService: any,
    private readonly syncBlockchainUseCase: ISyncBlockchainUseCase,
    private readonly getBlocksUseCase: IGetBlocksUseCase
  ) {
    this.PEARS_ADDRESS = process.env.WS_PEERS_ADDRESS ? process.env.WS_PEERS_ADDRESS.split(',') : []
    this.WS_PORT = Number(process.env.WS_PORT || 5001)
  }

  public start (): void {
    this._wsServer = new Server({ port: this.WS_PORT })
    this.logger.info(`[P2PServer::start] - Listening for peer-to-peer connections on: 127.0.0.1:${this.WS_PORT}`)
    this._wsServer.on('connection', connection => this._connectSocket(connection))
  }

  public registerConnectionEvent (handler: (nodeId: string) => void): void {
    this._wsServer.on('connection', connection => {
      const nodeId = this.p2pService.registerNewNode(connection)
      this.logger.info('[SP2PServer::_connectSocket] - socket connected')
      handler(nodeId)
    })
  }

  public registerEvent (event: string, handler: (connection: WebSocket) => void): void {
    this._wsServer.on(event, handler)
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

  public syncChains (): void {
    if (!this.PEARS_ADDRESS.length) {
      this.logger.info('[P2PServer::coonToNetwork] - Dont have node address to connect')
      return
    }

    this._connectedNodes.forEach(connection => this._sendChain(connection))
  }

  private _connectSocket (connection: WebSocket): void {
    this._connectedNodes.push(connection)
    this.logger.info('[SP2PServer::_connectSocket] - socket connected')

    this._handleMessage(connection)
    this._sendChain(connection)
  }

  private _handleMessage (connection: WebSocket): void {
    connection.on('message', message => {
      const chain = JSON.parse(message.toString())

      this.syncBlockchainUseCase.sync(chain)
    })
  }

  private async _sendChain (connection: WebSocket): Promise<void> {
    const chain = await this.getBlocksUseCase.perform()
    connection.send(JSON.stringify(chain.value))
  }
}

export { P2PServer }
