import { Block } from '../../domain/entities/block'
import { BaseError } from '../../shared/base_error'
import { Either, left, right } from '../../shared/either'
import { IBlockchainRepository } from '../interfaces/i_blockchain_repository'
import { IMineUseCase } from '../../domain/usecases/i_mine_usecase'

class MineUseCase implements IMineUseCase {
  constructor (private readonly blockchainRepository: IBlockchainRepository) {}

  public async perform (data: string[]): Promise<Either<BaseError, Block>> {
    const bc = await this.blockchainRepository.getBlockchain()
    if (bc.isLeft()) {
      return left(bc.value)
    }

    const blockchain = bc.value
    const createdBlock = blockchain.addBlock(data) as Block

    return right(createdBlock)
  }
}

export { MineUseCase }
