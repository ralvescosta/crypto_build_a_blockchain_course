/* eslint-disable dot-notation */

import { HttpServer } from '../../../src/infra/http_server/http_server'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

jest.mock('express', () => jest.fn(() => ({
  use: jest.fn(),
  json: jest.fn(),
  listen: jest.fn(),
  get: jest.fn()
})))
express.json = jest.fn()
jest.mock('cors', () => jest.fn(() => ({})))
jest.mock('helmet', () => jest.fn(() => ({})))
jest.mock('compression', () => jest.fn(() => ({})))

function makeSut () {
  const logger = {
    info: jest.fn()
  }
  const sut = new HttpServer(logger as any)

  return {
    logger,
    sut
  }
}

describe('HttpServer', () => {
  it('setup()', () => {
    const { sut } = makeSut()

    sut.setup()

    expect(express).toHaveBeenCalledTimes(1)
    expect(cors).toHaveBeenCalledTimes(1)
    expect(helmet).toHaveBeenCalledTimes(1)
    expect(compression).toHaveBeenCalledTimes(1)
  })

  it('registerRoute()', () => {
    const { sut } = makeSut()
    const method = 'get'
    const path = '/api'
    const handler = () => {}

    sut.registerRoute(method, path, handler)

    expect(sut['_server'].get).toHaveBeenCalledWith(path, handler)
    expect(sut['_server'].get).toHaveBeenCalledTimes(1)
  })

  it('run()', () => {
    const { sut, logger } = makeSut()

    sut.run()

    expect(sut['_server'].listen).toHaveBeenCalledTimes(1)
    expect(logger.info).toHaveBeenCalledTimes(1)
  })
})
