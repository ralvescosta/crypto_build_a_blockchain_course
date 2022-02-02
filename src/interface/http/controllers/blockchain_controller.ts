import { HttpRequest, HttpResponse } from '../../../infra/http_server/http'
import { IGetBlocksUseCase } from '../../../domain/usecases/i_get_blocks_usecases'
import { IHttpResponseFactory } from '../factories/i_http_response_factory'
import { IHttpErrorHandlerFactory } from '../factories/i_http_error_handler_factory'

class BlockchainController {
  constructor (
    private readonly getBlocksUseCase: IGetBlocksUseCase,
    private readonly httpResponseFactory: IHttpResponseFactory,
    private readonly httpErrorHandlerFactory: IHttpErrorHandlerFactory) {}

    public async getBlocks (_: HttpRequest): Promise<HttpResponse> {
      const result = await this.getBlocksUseCase.perform()
      if (result.isLeft()) {
        return this.httpErrorHandlerFactory.handler(result)
      }

      return this.httpResponseFactory.ok({ body: result.value })
    }
}

export { BlockchainController }
