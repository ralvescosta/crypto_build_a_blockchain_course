import { IDatabaseConn } from '../i_conn'
import { Blockchain } from '../../../domain/blockchain'

interface Db {
  blockchain: Blockchain
}

interface IInMemoryDatabaseConn extends IDatabaseConn {
  db: Db
}

export { IInMemoryDatabaseConn, Db }
