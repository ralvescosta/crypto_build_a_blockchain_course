import { WebSocket } from 'ws'
import crypto from 'crypto'
import { Block } from '../../domain/entities/block'
import { IP2PService } from '../../application/interfaces/i_p2p_service'
import { ILogger } from '../../application/interfaces/i_logger'
import { BaseError } from '../../shared/base_error'
import { Either, left, right } from '../../shared/either'

type INode = {
  [nodeId: string]: WebSocket
}

class P2PService implements IP2PService {
  private readonly _connectedNodes: INode = {}
  constructor (
    private readonly logger: ILogger
  ) {
  }

  public registerNewNode (nodeConn: WebSocket): string {
    const id = crypto.randomBytes(34).toString('base64')

    this._connectedNodes[id] = nodeConn

    return id
  }

  public registerNodeMessageHandler (nodeId: string, handler: (message: any) => void): Either<BaseError, boolean> {
    const isValid = this._validateIfNodeExiste(nodeId)
    if (isValid.isLeft()) return isValid

    this._connectedNodes[nodeId].on('message', (receivedMessage) => {
      const message = JSON.parse(receivedMessage.toString())
      handler(message)
    })

    return right(true)
  }

  public sendMessageToNode (nodeId: string, message: string): Either<BaseError, boolean> {
    const isValid = this._validateIfNodeExiste(nodeId)
    if (isValid.isLeft()) return isValid

    this._connectedNodes[nodeId].send(message)

    return right(true)
  }

  public broadcastChain (chain: Block[]): void {
    for (const nodeId in this._connectedNodes) {
      this._connectedNodes[nodeId].send(chain)
    }
  }

  private _validateIfNodeExiste (nodeId: string): Either<BaseError, boolean> {
    if (!this._connectedNodes[nodeId]) {
      this.logger.error('[P2PService::registerNodeMessageHandler] - NotFound NodeId')
      return left(new Error('NotFound the Node'))
    }

    return right(true)
  }
}

export { P2PService, INode }
