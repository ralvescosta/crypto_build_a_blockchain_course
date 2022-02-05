import { ILogger } from '../../../application/interfaces/i_logger'
import RouterAdapt from '../../../infra/adapters/express_router_adapt'
import { BlockchainController } from '../controllers/blockchain_controller'
import { IRouter } from '../i_router'
class Routes implements IRouter {
  constructor (
    private readonly logger: ILogger,
    private readonly httpServer: any,
    private readonly blockchainController: BlockchainController
  ) {}

  register (): void {
    this.httpServer.registerRoute(
      'get',
      '/api/v1/blocks',
      RouterAdapt(this.blockchainController.getBlocks.bind(this.blockchainController), this.logger)
    )

    this.httpServer.registerRoute(
      'post',
      '/api/v1/mine',
      RouterAdapt(this.blockchainController.mine.bind(this.blockchainController), this.logger)
    )
  }
}

export { Routes }
