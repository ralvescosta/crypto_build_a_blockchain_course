import { Guid } from '../../shared/guid'
import { Wallet } from './wallet'

type TxOutput = {
  amount: number,
  address: string
}
class Transaction {
  private constructor (
    public readonly id: string = Guid.new(),
    public readonly input: any = null,
    public readonly output: TxOutput[] = []
  ) {}

  static new (senderWaller: Wallet, recipient: string, amount: number): Transaction | undefined {
    if (amount > senderWaller.balance) {
      console.log(`[Transaction::New] - Amount ${amount} exceeds balance.`)
      return undefined
    }

    const outputs: TxOutput[] = [
      { amount: senderWaller.balance - amount, address: senderWaller.keyPair.publicKey },
      { amount, address: recipient }
    ]

    return new this(Guid.new(), null, outputs)
  }
}

export { Transaction }
