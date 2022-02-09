import { Keys } from '../../shared/keys'

class Wallet {
  public balance: number
  public readonly publicKey: string
  private readonly privateKey: string

  constructor () {
    this.balance = Number(process.env.INITIAL_WALLET_BALANCE) || 500
    const keyPair = Keys.genKeyPair()
    this.publicKey = keyPair.publicKey
    this.privateKey = keyPair.privateKey
  }

  public toString (): string {
    return `
    [Wallet]
    publicKey: ${this.publicKey.toString()}
    balance  : ${this.balance}
    `
  }
}

export { Wallet }
