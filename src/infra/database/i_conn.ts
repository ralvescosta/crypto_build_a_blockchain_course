import { Either } from '../../shared/either'
import { BaseError } from '../../shared/base_error'

interface IDatabaseConn {
  conn(): Promise<Either<BaseError, any>>
  isConnected(): Promise<Either<BaseError, Boolean>>
}

export { IDatabaseConn }
