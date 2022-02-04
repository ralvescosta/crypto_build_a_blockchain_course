import { routerConfig } from '../../../src/interface/http/router_config'

describe('Interface :: Http :: RouterConfig', () => {
  beforeEach(() => jest.clearAllMocks())
  it('routerConfig()', () => {
    const cradle = {
      bookRoutes: {
        register: jest.fn()
      },
      otherThing: {
        register: jest.fn()
      }
    }

    routerConfig(cradle)
    expect(cradle.bookRoutes.register).toHaveBeenCalledTimes(1)
    expect(cradle.otherThing.register).toHaveBeenCalledTimes(0)
  })
})
