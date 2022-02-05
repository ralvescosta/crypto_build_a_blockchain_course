import { Either } from '../../shared/either'
import { BaseError } from '../../shared/base_error'
import { Block } from '../../domain/entities/block'
import { Blockchain } from '../../domain/entities/blockchain'

interface IBlockchainRepository {
  getEntireChain(): Promise<Either<BaseError, [] | Block[]>>
  getBlockchain (): Promise<Either<BaseError, Blockchain>>
  getBlockchain(): Promise<Either<BaseError, Blockchain>>
  syncChain (chain: Block[]): Promise<void>
}

export { IBlockchainRepository }
