import { Block } from '../src/block'

describe('Block', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should create a genesis block correctly', () => {
    const block = Block.genesis()

    expect(block.data).toBeInstanceOf(Array)
    expect(block.lastHash).not.toBeUndefined()
    expect(block.hash).not.toBeUndefined()
  })
})
