import { Block } from '../../domain/entities/block'
import { BaseError } from '../../shared/base_error'
import { Either } from '../../shared/either'

interface IMineUseCase {
  perform: (data: string[]) => Promise<Either<BaseError, Block[]>>
}

export { IMineUseCase }
