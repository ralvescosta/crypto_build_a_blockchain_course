import { Blockchain } from '../src/blockchain'
import { Block } from '../src/block'

describe('Blockchain', () => {
  let blockchain: Blockchain, secondBlockchain: Blockchain

  beforeEach(() => {
    jest.clearAllMocks()
    blockchain = new Blockchain()
    secondBlockchain = new Blockchain()
  })

  it('should start with genesis block', () => {
    expect(blockchain.chain[0].data).toEqual(Block.genesis().data)
  })

  it('should add a new block', () => {
    const data = ['some data']

    blockchain.addBlock(data)

    expect((blockchain.getLastBlock() as Block).data).toEqual(data)
  })

  it('should return true if the chain is valid', () => {
    secondBlockchain.addBlock(['foo', 'bar'])

    expect(blockchain.isValidChain(secondBlockchain.chain)).toBeTruthy()
  })

  it('invalidates a chain with corrupt genesis block', () => {
    secondBlockchain.chain[0] = new Block(Date.now(), 'a', 'b', ['s'])

    expect(blockchain.isValidChain(secondBlockchain.chain)).toBeFalsy()
  })

  it('invalidate a corrupt chain', () => {
    secondBlockchain.addBlock(['foo'])
    secondBlockchain.chain[1].data = ['Not foo anymore']

    expect(blockchain.isValidChain(secondBlockchain.chain)).toBeFalsy()
  })

  it('should replace the chain with a valid chain', () => {
    secondBlockchain.addBlock(['bar'])

    blockchain.replaceChain(secondBlockchain.chain)

    expect(blockchain.chain).toEqual(secondBlockchain.chain)
  })

  it('does not replace the chain with one of less than or equal to length', () => {
    blockchain.addBlock(['baz'])

    blockchain.replaceChain(secondBlockchain.chain)

    expect(blockchain.chain).not.toEqual(secondBlockchain.chain)
  })
})
