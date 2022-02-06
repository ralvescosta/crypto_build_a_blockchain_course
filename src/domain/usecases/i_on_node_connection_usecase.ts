interface IOnNodeConnectionUseCase {
  perform (nodeId: string): Promise<void>
}

export { IOnNodeConnectionUseCase }
