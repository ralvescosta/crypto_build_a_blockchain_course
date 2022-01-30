import { Environment } from './infra/environments/environments'
import { registerInjections } from './ioc'
import { routerConfig } from './shared/router_config'

;(() => {
  Environment.registerEnvironments()
  const container = registerInjections()

  const { httpServer } = container.cradle

  httpServer.setup()
  routerConfig(container.cradle)
  httpServer.run()
})()
