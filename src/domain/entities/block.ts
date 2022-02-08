import SHA256 from 'crypto-js/sha256'
class Block {
  static DIFFICULTY: number = Number(process.env.DIFFICULTY) || 4;
  static MINE_RATE: number = Number(process.env.MINE_RATE) || 3000;

  private constructor (
    public timestamp: number,
    public lastHash: string,
    public hash: string,
    public data: string[],
    public nonce: number,
    public difficulty: number
  ) {}

  public toString () {
    return `
    [Block]
    Timestamp : ${this.timestamp}
    Last Hash : ${this.lastHash}
    Hash      : ${this.hash}
    Nonce     : ${this.nonce}
    Data      : ${this.data}
    Difficulty: ${this.difficulty}
  `
  }

  static genesis (): Block {
    const data = ['Genesis']
    return this.mineBlock({ hash: '', difficulty: this.DIFFICULTY } as any, data)
  }

  static mineBlock (lastBlock: Block, data: string[]): Block {
    const { hash: lastHash } = lastBlock
    let { difficulty } = lastBlock
    let nonce = 0
    let timestamp = Date.now()
    let hash = this.hash(timestamp, lastHash, data, nonce, difficulty)

    while (hash.slice(0, difficulty) !== '0'.repeat(difficulty)) {
      nonce++
      timestamp = Date.now()
      difficulty = this.adjustDifficulty(lastBlock, timestamp)
      hash = this.hash(timestamp, lastHash, data, nonce, difficulty)
    }

    return new this(timestamp, lastHash, hash, data, nonce, difficulty)
  }

  static hash (timestamp: number, lastHash: string, data: string[], nonce: number, difficulty: number): string {
    return SHA256(`${timestamp}${lastHash}${data.join()}${nonce}${difficulty}`).toString()
  }

  static blockHash (block: Block): string {
    const { timestamp, lastHash, data, nonce, difficulty } = block
    return this.hash(timestamp, lastHash, data, nonce, difficulty)
  }

  static adjustDifficulty (lastBlock: Block, currentTime: number): number {
    const { difficulty, timestamp } = lastBlock

    if ((timestamp + this.MINE_RATE) > currentTime) {
      return difficulty + 1
    }

    return difficulty - 1
  }
}

export { Block }
