import { IOnNodeConnectionUseCase } from '../../../domain/usecases/i_on_node_connection_usecase'

class OnNodeConnectionController {
  constructor (
    private readonly onNodeConnectionUseCase: IOnNodeConnectionUseCase
  ) {}

  public async connection (nodeId: string): Promise<void> {
    await this.onNodeConnectionUseCase.perform(nodeId)
  }
}

export { OnNodeConnectionController }
