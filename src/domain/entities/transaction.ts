import { Guid } from '../../shared/guid'
import { BaseError } from '../../shared/base_error'
import { Either, left, right } from '../../shared/either'
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

  static new (senderWaller: Wallet, recipient: string, amount: number): Either<BaseError, Transaction> {
    if (amount > senderWaller.balance) {
      console.log(`[Transaction::New] - Amount ${amount} exceeds balance.`)
      return left(new Error(''))
    }

    const outputs: TxOutput[] = [
      { amount: senderWaller.balance - amount, address: senderWaller.publicKey },
      { amount, address: recipient }
    ]

    return right(new this(Guid.new(), null, outputs))
  }
}

export { Transaction, TxOutput }
