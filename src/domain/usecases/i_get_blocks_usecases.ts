import { BaseError } from '../../shared/base_error'
import { Either } from '../../shared/either'
import { Block } from '../../domain/block'

interface IGetBlocksUseCase {
   perform (): Promise<Either<BaseError, [] | Block[]>>
}

export { IGetBlocksUseCase }
