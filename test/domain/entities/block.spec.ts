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
})
