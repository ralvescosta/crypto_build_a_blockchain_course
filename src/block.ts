class Block {
  constructor (
    private readonly _timestamp: number,
    private readonly _lastHash: string,
    private readonly _hash: string,
    private readonly _data: string[]
  ) {}

  public toString () {
    return `[Block] 
      Timestamp: ${this._timestamp}
      Last Hash: ${this._lastHash.slice(0, 10)}
      Hash: ${this._hash.slice(0, 10)}
      Data: ${this._data}
  `
  }

  static genesis (): Block {
    return new this(Date.now(), '---', 'has3', [])
  }
}

export { Block }
