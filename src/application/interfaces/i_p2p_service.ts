import { Block } from '../../domain/entities/block'
import { Either } from '../../shared/either'
import { BaseError } from '../../shared/base_error'

interface IP2PService {
  registerNewNode (nodeConn: any): string
  registerNodeMessageHandler (nodeId: string, handler: (message: any) => void): Either<BaseError, boolean>
  sendMessageToNode (nodeId: string, message: string): Either<BaseError, boolean>
  broadcastChain (chain: Block[]): void
}

export { IP2PService }
