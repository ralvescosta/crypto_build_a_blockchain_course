import { Block } from '../../domain/entities/block'
import { BaseError } from '../../shared/base_error'
import { Either, left } from '../../shared/either'
import { IBlockchainRepository } from '../interfaces/i_blockchain_repository'
import { IMineUseCase } from '../../domain/usecases/i_mine_usecase'
import { IGetBlocksUseCase } from '../../domain/usecases/i_get_blocks_usecase'

class MineUseCase implements IMineUseCase {
  constructor (
    private readonly blockchainRepository: IBlockchainRepository,
    private readonly getBlocksUseCase: IGetBlocksUseCase
  ) {}

  public async perform (data: string[]): Promise<Either<BaseError, Block[]>> {
    const blockchain = await this.blockchainRepository.getBlockchain()
    if (blockchain.isLeft()) {
      return left(blockchain.value)
    }

    blockchain.value.addBlock(data) as Block

    return this.getBlocksUseCase.perform()
  }
}

export { MineUseCase }
