import { v4 } from 'uuid'

class Guid {
  static new (): string {
    return v4()
  }
}

export { Guid }
