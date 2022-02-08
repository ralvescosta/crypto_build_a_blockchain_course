import { Block } from '../../../src/domain/entities/block'

describe('Domain :: Entities :: Block', () => {
  let genesisBlock: Block, secondBlock: Block

  beforeEach(() => {
    jest.clearAllMocks()

    genesisBlock = Block.genesis()
    secondBlock = Block.mineBlock(genesisBlock, ['some data'])
  })
  it('should create a genesis block correctly', () => {
    const block = Block.genesis()

    expect(block.data).toBeInstanceOf(Array)
    expect(block.lastHash).not.toBeUndefined()
    expect(block.hash).not.toBeUndefined()
  })

  it('should second block contains lastHash for thw last block ', () => {
    expect(secondBlock.lastHash).toEqual(genesisBlock.hash)
  })

  it('should hash correctly using blockHash()', () => {
    expect(secondBlock.hash).toEqual(Block.blockHash(secondBlock))
  })

  it('should generates a hash that matches the difficulty', () => {
    expect(genesisBlock.hash.slice(0, genesisBlock.difficulty)).toEqual('0'.repeat(genesisBlock.difficulty))
  })

  it('should lowers difficulty for slowly mined blocks', () => {
    expect(Block.adjustDifficulty(genesisBlock, genesisBlock.timestamp + 360000)).toEqual(genesisBlock.difficulty - 1)
  })

  it('should raise the difficulty for quickly mined blocks', () => {
    expect(Block.adjustDifficulty(genesisBlock, genesisBlock.timestamp + 1)).toEqual(genesisBlock.difficulty + 1)
  })
})
