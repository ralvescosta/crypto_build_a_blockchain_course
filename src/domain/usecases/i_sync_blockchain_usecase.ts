import { Block } from '../entities/block'

interface ISyncBlockchainUseCase {
  sync: (blockchain: Block[]) => void
  // send: (blockchain: Block[]) => void
}

export { ISyncBlockchainUseCase }
