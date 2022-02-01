// import { ILogger } from '../../application/interfaces/i_logger'
// import RouterAdapt from '../../infra/adapters/express_router_adapt'
// import { IControllerBase } from '../controllers/i_controller_base'
import { IRouter } from '../../shared/i_roter'
class Routes implements IRouter {
  constructor (private readonly httpServer: any) {}
  register (): void {
    this.httpServer.registerRoute('post', '/v1/api/blockchain', () => {})
    this.httpServer.registerRoute('post', '/v1/api/add-block', () => {})
    this.httpServer.registerRoute('post', '/v1/api/replace-chain', () => {})
  }
}

export { Routes }
