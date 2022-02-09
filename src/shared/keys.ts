import { ec as EC } from 'elliptic'

class Keys {
  private static elliptic: EC = new EC('secp256k1')

  static genKeyPair () {
    const keyPair = this.elliptic.genKeyPair()

    return {
      publicKey: keyPair.getPublic().encode('hex', false),
      privateKey: keyPair.getPrivate().toString()
    }
  }
}

export { Keys }
