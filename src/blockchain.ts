import { Block } from './block'

class Blockchain {
  public chain: Block[]
  constructor () {
    this.chain = [Block.genesis()]
  }

  public getLastBlock (): Block | undefined {
    if (!this.chain.length) {
      return undefined
    }

    return this.chain[this.chain.length - 1]
  }

  public addBlock (data: string[]): Block | undefined {
    const lastBlock = this.getLastBlock()
    if (lastBlock === undefined) {
      return undefined
    }

    const block = Block.mineBlock(lastBlock, data)
    this.chain.push(block)

    return block
  }

  public isValidChain (chain: Block[]) {
    if (JSON.stringify(chain[0].data) !== JSON.stringify(Block.genesis().data)) return false

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i]
      const lastBlock = chain[i - 1]

      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) return false
    }

    return true
  }

  public replaceChain (newChain: Block[]): void {
    if (newChain.length <= this.chain.length) {
      console.log('Received chain is not longer than the current chain length')
      return
    }

    if (!this.isValidChain(newChain)) {
      console.log('The received chain is not valid.')
      return
    }

    console.log('Replacing blockchain with the new chain.')
    this.chain = newChain
  }
}

export { Blockchain }
