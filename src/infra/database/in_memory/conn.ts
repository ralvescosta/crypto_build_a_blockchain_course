import { Blockchain } from '../../../domain/blockchain'
import { ILogger } from '../../../application/interfaces/i_logger'
import { BaseError } from '../../../shared/base_error'
import { Either, right } from '../../../shared/either'
import { IInMemoryDatabaseConn, Db } from './i_in_memory_conn'

class InMemoryDatabaseConn implements IInMemoryDatabaseConn {
  public db: Db

  constructor (private readonly logger: ILogger) {
    this.db = { blockchain: new Blockchain(this.logger) }
  }

  public async conn (): Promise<Either<BaseError, any>> {
    return right({})
  }

  public async isConnected (): Promise<Either<BaseError, Boolean>> {
    return right(true)
  }
}

export { InMemoryDatabaseConn }
