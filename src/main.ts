import { Environment } from './infra/environments/environments'
import { registerInjections } from './ioc'
import { routerConfig } from './interface/http/router_config'

;(() => {
  Environment.registerEnvironments()
  const container = registerInjections()

  const { httpServer, wsServer, wsEvents, onNodeConnectionController } = container.cradle

  httpServer.setup()
  routerConfig(container.cradle)
  httpServer.run()

  wsServer.start()
  wsEvents.register()
  wsServer.connectToNetwork(onNodeConnectionController)
})()
