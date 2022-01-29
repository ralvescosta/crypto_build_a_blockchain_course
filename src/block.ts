import SHA256 from 'crypto-js/sha256'
class Block {
  constructor (
    public readonly timestamp: number,
    public readonly lastHash: string,
    public readonly hash: string,
    public readonly data: string[]
  ) {}

  public toString () {
    return `[Block]
      Timestamp: ${this.timestamp}
      Last Hash: ${this.lastHash}
      Hash: ${this.hash}
      Data: ${this.data}
  `
  }

  static genesis (): Block {
    const timestamp = Date.now()
    const data = ['Genesis']

    return new this(Date.now(), '', this.hash(timestamp, '', data), data)
  }

  static mineBlock (lastBlock: Block, data: string[]): Block {
    const timestamp = Date.now()
    const lastHash = lastBlock.hash
    const hash = this.hash(timestamp, lastHash, data)

    return new this(timestamp, lastHash, hash, data)
  }

  static hash (timestamp: number, lastHash: string, data: string[]): string {
    return SHA256(`${timestamp}${lastHash}${data.join()}`).toString()
  }
}

export { Block }
