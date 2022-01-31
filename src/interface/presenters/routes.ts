// import { ILogger } from '../../application/interfaces/i_logger'
// import RouterAdapt from '../../infra/adapters/express_router_adapt'
// import { IControllerBase } from '../controllers/i_controller_base'
import { IRouter } from '../../shared/i_roter'
class Routes implements IRouter {
  constructor (private readonly httpServer: any) {}
  register (): void {
    this.httpServer.registerRoute('post', '/v1/api/books', () => {})
    this.httpServer.registerRoute('get', '/v1/api/books', () => {})
    this.httpServer.registerRoute('get', '/v1/api/book/:id', () => {})
    this.httpServer.registerRoute('put', '/v1/api/book/:id', () => {})
    this.httpServer.registerRoute('delete', '/v1/api/book/:id', () => {})
  }
}

export { Routes }
