import { Block } from '../../domain/entities/block'
import { BaseError } from '../../shared/base_error'
import { Either, left, right } from '../../shared/either'
import { IBlockchainRepository } from '../interfaces/i_blockchain_repository'
import { IMineUseCase } from '../../domain/usecases/i_mine_usecase'
import { IGetBlocksUseCase } from '../../domain/usecases/i_get_blocks_usecase'
import { IP2PService } from '../interfaces/i_p2p_service'

class MineUseCase implements IMineUseCase {
  constructor (
    private readonly blockchainRepository: IBlockchainRepository,
    private readonly getBlocksUseCase: IGetBlocksUseCase,
    private readonly p2pService: IP2PService
  ) {}

  public async perform (data: string[]): Promise<Either<BaseError, Block[]>> {
    const blockchain = await this.blockchainRepository.getBlockchain()
    if (blockchain.isLeft()) {
      return left(blockchain.value)
    }

    blockchain.value.addBlock(data) as Block

    const chain = await this.getBlocksUseCase.perform()
    if (chain.isLeft()) {
      return chain
    }

    this.p2pService.broadcastChain(chain.value)

    return right(chain.value)
  }
}

export { MineUseCase }
