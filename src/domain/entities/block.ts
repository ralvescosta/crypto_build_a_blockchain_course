import SHA256 from 'crypto-js/sha256'
class Block {
  static DIFFICULTY: number = 4

  constructor (
    public timestamp: number,
    public lastHash: string,
    public hash: string,
    public data: string[],
    public nonce: number
  ) {}

  public toString () {
    return `[Block]
      Timestamp: ${this.timestamp}
      Last Hash: ${this.lastHash}
      Hash     : ${this.hash}
      Nonce    : ${this.nonce}
      Data     : ${this.data}
  `
  }

  static genesis (): Block {
    const data = ['Genesis']
    return this.mineBlock({ hash: '' } as any, data)
  }

  static mineBlock (lastBlock: Block, data: string[]): Block {
    const lastHash = lastBlock.hash
    let nonce = 0
    let timestamp = Date.now()
    let hash = this.hash(timestamp, lastHash, data, nonce)

    while (hash.slice(0, this.DIFFICULTY) !== '0'.repeat(this.DIFFICULTY)) {
      nonce++
      timestamp = Date.now()
      hash = this.hash(timestamp, lastHash, data, nonce)
    }

    return new this(timestamp, lastHash, hash, data, nonce)
  }

  static hash (timestamp: number, lastHash: string, data: string[], nonce: number): string {
    return SHA256(`${timestamp}${lastHash}${data.join()}${nonce}`).toString()
  }

  static blockHash (block: Block): string {
    const { timestamp, lastHash, data, nonce } = block

    return this.hash(timestamp, lastHash, data, nonce)
  }
}

export { Block }
