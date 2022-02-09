import { Guid } from '../../shared/guid'
import { Wallet } from './wallet'

type TxOutput = {
  amount: number,
  address: string
}
class Transaction {
  private constructor (
    private readonly id: string = Guid.new(),
    private readonly input: any = null,
    private readonly output: TxOutput[] = []
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
