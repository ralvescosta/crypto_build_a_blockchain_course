import { Environment } from '../../../src/infra/environments/environments'
import dotEnv from 'dotenv'

jest.mock('dotenv', () => ({
  config: jest.fn
}))

describe('Environments', () => {
  beforeEach(() => jest.clearAllMocks())
  it('registerEnvironments()', () => {
    jest.spyOn(dotEnv, 'config')

    Environment.registerEnvironments()

    expect(dotEnv.config).toHaveBeenCalledTimes(1)
    expect(dotEnv.config).toHaveBeenCalledWith({ path: '.env.test' })
  })

  it('Should config .env.development if NODE_ENV is undefined', () => {
    jest.spyOn(dotEnv, 'config')
    delete process.env.NODE_ENV

    Environment.registerEnvironments()

    expect(dotEnv.config).toHaveBeenCalledTimes(1)
    expect(dotEnv.config).toHaveBeenCalledWith({ path: '.env.development' })
  })
})
