import { IP2PService } from '../interfaces/i_p2p_service'
import { IOnNodeConnectionUseCase } from '../../domain/usecases/i_on_node_connection_usecase'
import { ISyncBlockchainUseCase } from '../../domain/usecases/i_sync_blockchain_usecase'
import { IGetBlocksUseCase } from '../../domain/usecases/i_get_blocks_usecase'

class OnNodeConnectionUseCase implements IOnNodeConnectionUseCase {
  constructor (
    private readonly p2pService: IP2PService,
    private readonly syncBlockchainUseCase: ISyncBlockchainUseCase,
    private readonly getBlocksUseCase: IGetBlocksUseCase
  ) {}

  public async perform (nodeId: string): Promise<void> {
    this.p2pService.registerNodeMessageHandler(
      nodeId,
      this.syncBlockchainUseCase.sync.bind(this.syncBlockchainUseCase)
    )

    const chain = await this.getBlocksUseCase.perform()
    if (chain.isLeft()) {
      return
    }

    this.p2pService.sendMessageToNode(nodeId, JSON.stringify(chain.value))
  }
}

export { OnNodeConnectionUseCase }
