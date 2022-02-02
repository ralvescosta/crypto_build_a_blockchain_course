import { Either } from '../../shared/either'
import { BaseError } from '../../shared/base_error'
import { Block } from '../../domain/block'

interface IBlockchainRepository {
  getEntireChain(): Promise<Either<BaseError, [] | Block[]>>
}

export { IBlockchainRepository }
