import { ISyncBlockchainUseCase } from '../../domain/usecases/i_sync_blockchain_usecase'
import { Block } from '../../domain/entities/block'
import { IBlockchainRepository } from '../interfaces/i_blockchain_repository'

class SyncBlockchainUseCase implements ISyncBlockchainUseCase {
  constructor (
    private readonly blockchainRepository: IBlockchainRepository
  ) {}

  public sync (blockchain: Block[]): void {
    this.blockchainRepository.syncChain(blockchain)
  }
}

export { SyncBlockchainUseCase }
