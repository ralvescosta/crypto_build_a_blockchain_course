import { Environment } from './infra/environments/environments'
import { registerInjections } from './ioc'
import { routerConfig } from './interface/http/router_config'

;(() => {
  Environment.registerEnvironments()
  const container = registerInjections()

  const { httpServer, p2pServer } = container.cradle

  httpServer.setup()
  routerConfig(container.cradle)
  httpServer.run()

  p2pServer.start()
  p2pServer.connToNetwork()
})()
