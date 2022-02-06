import { OnNodeConnectionController } from '../controllers/on_node_connection_controller'

class Events {
  constructor (
    private readonly wsServer: any,
    private readonly onNodeConnectionController: OnNodeConnectionController
  ) {}

  public register (): void {
    this.wsServer.registerConnectionEvent(
      this.onNodeConnectionController.connection.bind(this.onNodeConnectionController)
    )
  }
}

export { Events }
