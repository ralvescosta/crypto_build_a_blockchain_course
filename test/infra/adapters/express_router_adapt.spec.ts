import RouteAdapt from '../../../src/infra/adapters/express_router_adapt'

function makeSut ({ statusCode }: { statusCode: number }) {
  const handler = jest.fn(async () => {
    return Promise.resolve({ statusCode, body: {}, headers: {} })
  })
  const logger = {
    info: jest.fn(),
    error: jest.fn()
  } as any
  const expressRequest = {
    body: {},
    headers: {},
    params: {},
    query: {},
    auth: {},
    method: '',
    path: ''
  } as any
  const expressResponse = {
    status: jest.fn(() => ({
      header: jest.fn(() => ({
        json: jest.fn()
      }))
    }))
  } as any

  const sut = RouteAdapt(handler, logger)

  return {
    handler,
    logger,
    expressRequest,
    expressResponse,
    sut
  }
}

describe('Infra :: Adapters :: ExpressRouterAdapt', () => {
  beforeEach(() => jest.clearAllMocks())
  it('RoutAdapt success', async () => {
    const { sut, logger, expressRequest, expressResponse } = makeSut({ statusCode: 201 })

    await sut(expressRequest, expressResponse)

    expect(logger.info).toHaveBeenCalledTimes(2)
    expect(expressResponse.status).toHaveBeenCalledTimes(1)
  })

  it('RoutAdapt error', async () => {
    const { sut, logger, expressRequest, expressResponse } = makeSut({ statusCode: 404 })

    await sut(expressRequest, expressResponse)

    expect(logger.info).toHaveBeenCalledTimes(1)
    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(expressResponse.status).toHaveBeenCalledTimes(1)
  })
})
