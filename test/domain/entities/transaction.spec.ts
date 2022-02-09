import { Transaction } from '../../../src/domain/entities/transaction'
import { Wallet } from '../../../src/domain/entities/wallet'

describe('Domain::Entities::Transaction', () => {
  describe('Successfully transaction', () => {
    let transaction: Transaction, wallet: Wallet, recipient: string, amount: number

    beforeEach(() => {
      jest.clearAllMocks()

      wallet = new Wallet()
      recipient = 'rca1j1l2a23'
      amount = 50
      transaction = Transaction.new(wallet, recipient, amount).value as Transaction
    })

    it('should output amount subtracted from the wallet balance', () => {
      const outputAmount = transaction.output.find(out => out.address === wallet.publicKey)!.amount!
      const expectedAmount = wallet.balance - amount

      expect(outputAmount).toEqual(expectedAmount)
    })

    it('should output added the amount to the recipient', () => {
      const outputAmount = transaction.output.find(out => out.address === recipient)!.amount!

      expect(outputAmount).toEqual(amount)
    })
  })

  describe('Wrong Transaction', () => {
    let transaction: Transaction, wallet: Wallet, recipient: string, amount: number

    beforeEach(() => {
      jest.clearAllMocks()

      wallet = new Wallet()
      recipient = 'rca1j1l2a23'
      amount = 550
      transaction = Transaction.new(wallet, recipient, amount).value as Transaction
    })
  })
})
