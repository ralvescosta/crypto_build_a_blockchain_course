import { Block } from './block'

class Blockchain {
  public readonly chain: Block[]
  constructor () {
    this.chain = [Block.genesis()]
  }

  getLastBlock (): Block | undefined {
    if (!this.chain.length) {
      return undefined
    }

    return this.chain[this.chain.length - 1]
  }

  addBlock (data: string[]): Block | undefined {
    const lastBlock = this.getLastBlock()
    if (lastBlock === undefined) {
      return undefined
    }

    const block = Block.mineBlock(lastBlock, data)
    this.chain.push(block)

    return block
  }
}

export { Blockchain }
