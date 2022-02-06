const routerConfig = (cradle: any): void => {
  Object.keys(cradle).forEach((key: string) => {
    if (key.includes('HttpRoutes')) {
      cradle[key].register()
    }
  })
}

export { routerConfig }
