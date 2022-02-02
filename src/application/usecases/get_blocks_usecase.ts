import { BaseError } from '../../shared/base_error'
import { Either, right } from '../../shared/either'
import { Block } from '../../domain/entities/block'
import { IBlockchainRepository } from '../interfaces/i_blockchain_repository'

class GetBlocksUseCase {
  constructor (private readonly blockchainRepository: IBlockchainRepository) {}

  public async perform (): Promise<Either<BaseError, [] | Block[]>> {
    const blocks = await this.blockchainRepository.getEntireChain()
    if (blocks.isLeft()) {
      return blocks
    }

    return right(blocks.value)
  }
}

export { GetBlocksUseCase }
