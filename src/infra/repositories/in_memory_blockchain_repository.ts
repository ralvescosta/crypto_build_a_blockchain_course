import { BaseError } from '../../shared/base_error'
import { Either, right } from '../../shared/either'
import { Block } from '../../domain/entities/block'
import { Blockchain } from '../../domain/entities/blockchain'
import { IInMemoryDatabaseConn } from '../database/in_memory/i_in_memory_conn'
import { IBlockchainRepository } from '../../application/interfaces/i_blockchain_repository'

class InMemoryBlockchainRepository implements IBlockchainRepository {
  constructor (private readonly dbConn: IInMemoryDatabaseConn) {}

  public async getEntireChain (): Promise<Either<BaseError, [] | Block[]>> {
    return right(this.dbConn.db.blockchain.chain)
  }

  public async syncChain (chain: Block[]): Promise<void> {
    this.dbConn.db.blockchain.replaceChain(chain)
  }

  public async getBlockchain (): Promise<Either<BaseError, Blockchain>> {
    return right(this.dbConn.db.blockchain)
  }
}

export { InMemoryBlockchainRepository }
