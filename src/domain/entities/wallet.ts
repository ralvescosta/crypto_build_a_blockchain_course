import { Keys } from '../../shared/keys'

class Wallet {
  constructor (
    public balance: number,
    public readonly keyPair = Keys.genKeyPair()
  ) {
    this.balance = Number(process.env.INITIAL_WALLET_BALANCE) || 500
  }

  public toString (): string {
    return `
    [Wallet]
    publicKey: ${this.keyPair.publicKey.toString()}
    balance  : ${this.balance}
    `
  }
}

export { Wallet }
