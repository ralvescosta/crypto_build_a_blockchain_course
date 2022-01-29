import { Blockchain } from '../src/blockchain'
import { Block } from '../src/block'

describe('Blockchain', () => {
  let blockchain: Blockchain

  beforeEach(() => {
    jest.clearAllMocks()
    blockchain = new Blockchain()
  })

  it('should start with genesis block', () => {
    expect(blockchain.chain[0].data).toEqual(Block.genesis().data)
  })

  it('should add a new block', () => {
    const data = ['some data']

    blockchain.addBlock(data)

    expect((blockchain.getLastBlock() as Block).data).toEqual(data)
  })
})
